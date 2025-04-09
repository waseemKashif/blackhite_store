import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProviders from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";
export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProviders({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        // credentials.password is getting from user form.
        //   user.password is coming from database of user
        // check if user exists and password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          // check if password matches and correct then return the user.
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // if user does not exits or passowrd not matches
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any){// eslint-disable-line @typescript-eslint/no-explicit-any

      // set the user id from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;
      // if there is any update, set user name
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },

    async jwt({ token, user, trigger }:any) {// eslint-disable-line @typescript-eslint/no-explicit-any
      // assign user fields to the token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // if user do not have a name then user the email
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          // update the database to reflect the token name
          await prisma.user.update({
            where: { id: user.id },
            // change this field
            data: { name: token.name },
          });
        }
        if (trigger === "signIn" || trigger === "signUp") {
          const cookesObject = await cookies();
          const sessionCartId = cookesObject.get("sessionCartId")?.value;

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: {
                sessionCartId,
              },
            });
            if (sessionCart) {
              // delete current user cart
              // await prisma.cart.deleteMany({
              //   where: {
              //     userId: user.id,
              //   },
              // });
              // assign new cart
              await prisma.cart.updateMany({
                where: {
                  id: sessionCart.id,
                },
                data: {
                  userId: user.id,
                },
              });
            }
          }
        }
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
