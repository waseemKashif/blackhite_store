"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { CartItem, shippingAddressType } from "@/types";
import { prisma } from "@/db/prisma";
import { insertOrderSchema } from "../validators";

// create order and create the order items

export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not aunthenticated");
    const userId = session?.user?.id;
    const cart = await getMyCart();
    if (!cart || cart?.items?.length === 0) {
      return {
        success: false,
        message: "No items in cart",
        redirectTo: "/cart",
      };
    }
    const user = await getUserById(userId as string);
    if (!user) {
      return {
        success: false,
        message: "No User found",
        redirectTo: "/login",
      };
    }
    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No Payment method found",
        redirectTo: "/payment-method",
      };
    }
    const userAddress = user.address as shippingAddressType;
    if (!userAddress) {
      return {
        success: false,
        message: "No Shipping address found",
        redirectTo: "/shipping-address",
      };
    }
    // validations end for inital order creation

    // create order object
    const order = await insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: userAddress,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
      // items: cart.items,
    });
    // create a transtaction to create order and order items in the database

    const insertedOrderId = await prisma.$transaction(async (tx) => {
      // create order
      const insertedOrder = await tx.order.create({
        data: order,
      });
      // create order items from the cart items
      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            regularPrice: item.regularPrice,
            discountedPrice: item.discountedPrice ? item.discountedPrice : 0,
            orderId: insertedOrder.id,
            qty: item.qty,
          },
        });
      }

      // clear the cart after order is created
      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: [],
          itemsPrice: 0,
          shippingPrice: 0,
          discountedPrice: "0",
          totalPrice: 0,
        },
      });
      return insertedOrder.id;
    });
    if (!insertedOrderId) throw new Error("Order not created");
    return {
      success: true,
      message: "Order created successfully",
      redirectTo: `/orders/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message: `Something went wrong and ${error}`,
    };
  }
}
