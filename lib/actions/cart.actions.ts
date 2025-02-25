"use server";
import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { get } from "http";
import { cartItemSchema } from "../validators";

export async function addItemToCart(data: CartItem) {
  try {
    // check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("Cart Session not found");
    }
    // GET session and user ID from the token
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = getMyCart(data);
    // parse and validate the item
    const item = cartItemSchema.parse(data);
    // find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    // testing if sessionCartId is available
    console.log({
      "Session Cart ID": sessionCartId,
      "User ID": userId,
      "item Requested": item,
      "product found": product,
    });
    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart(data: CartItem) {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) {
    throw new Error("Cart Session not found");
  }
  // GET session and user ID from the token
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;
  // get user cart from database by user id and session cart id

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });
  if (!cart) {
    return undefined;
  }
  // convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPriceotal: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    // taxPrice: cart.taxPrice.toString(),
  });
}
