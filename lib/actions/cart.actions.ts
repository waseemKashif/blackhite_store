"use server";
import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// CALCLATE CART PRICES
const calcPrices = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.regularPrice) * item.qty, 0)
    ),
    shippingPrice = itemsPrice > 100 ? 0 : 20,
    // taxPrice = round2(itemsPrice * 0.15),
    totalPrice = round2(itemsPrice + shippingPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
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

    const cart = await getMyCart();
    // parse and validate the item
    const item = cartItemSchema.parse(data);
    // find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not found");

    if (!cart) {
      // create a new cart
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrices([item]),
      });
      // add cart to database
      await prisma.cart.create({ data: newCart });
      // revalidate path
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: "Item added to cart",
      };
    } else {
      // check if the item is already in the cart
      const existingItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );
      if (existingItem) {
        // check stock
        if (product.stock < existingItem.qty + 1) {
          throw new Error("Product out of stock");
        } else {
          // increase the quantity of the item
          existingItem.qty = existingItem?.qty + 1;
        }
      } else {
        // if item is not in the cart
        // check stock
        if (product.stock < 1) {
          throw new Error("Product out of stock");
        }
        // add the item to the cart
        cart.items.push(item);
      }
      // update the cart
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrices(cart.items as CartItem[]),
        },
      });
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name} ${
          existingItem ? "updated in" : "added to"
        } cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart Session not found");

  // GET session and user ID from the token
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // get user cart from database by user id and session cart id
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

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
export async function removeItemFromCart(productId: string) {
  try {
    // check for cart cookie
     const sessionCartId = (await cookies()).get("sessionCartId")?.value;
     if (!sessionCartId) throw new Error("Cart Session not found");
    // get the product 
    const product = await prisma.product.findFirst ({
      where:{id:productId}
    })
    if (!product) throw new Error("Product not found");
    // get users cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");
    // check  the item in the cart
    const exist = (cart.items as CartItem[]).find((x)=> x.productId === productId);
    if (!exist) throw new Error("Product not found in cart");
    // check if there is only one quantity of the item
    if (exist.qty === 1) {
      // Remove item from cart 
      cart.items = (cart.items as CartItem[]).filter((x)=> x.productId !== productId);
      // update the cart

    } else {
      // decrease the quantity of the item
      exist.qty = exist.qty - 1;
      // update the cart
    }
    // updated cart in the database
    await prisma.cart.update({ 
      where: {id: cart.id},
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrices(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);
    return {  
      success: true,
      message: `${product.name} removed from cart`,
    };

  } catch (error) {
    return {
      success: false,
      message: formatError(error)
    }
  }
}
