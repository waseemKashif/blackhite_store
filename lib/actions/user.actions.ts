"use server";

import {
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  paymentMethodSchema,
} from "../validators";
import { z } from "zod";
import { auth, signIn, signOut } from "@/auth_copy_lightweight";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { shippingAddressType } from "@/types";
// sign In user with the credentials , sign in action of user as a server action
// we will use here useAction hook. which will get previous state of form first.
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    // after validation we will send data to our auth to check sign in
    await signIn("credentials", user);
    return { success: true, message: "Signed In Successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid Email or Password" };
  }
}

// sign OUT of user when user clicks signOut.
export async function signOutUser() {
  await signOut();
}

// sign up action

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    const plainPassword = user.password;
    user.password = hashSync(user.password, 10);

    // create user in database
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User Registered Successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    // passing the error object to our utlis function of error format to specify user about specific error
    return { success: false, message: formatError(error) };
  }
}

// get user ID from session
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

// update users address
export async function updateUserAddress(data: shippingAddressType) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });
    if (!currentUser) throw new Error("User not found");
    const address = shippingAddressSchema.parse(data);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        address: address,
      },
    });
    return { success: true, message: "Address updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// updated users payment method

export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });
    if (!currentUser) throw new Error("User not found");
    const paymentMethod = paymentMethodSchema.parse(data);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        paymentMethod: paymentMethod.type,
      },
    });
    return { success: true, message: "Payment method updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
