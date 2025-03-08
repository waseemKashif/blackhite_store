import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect, Redirect } from "next/navigation";
import { shippingAddressSchema } from "@/types";
import { getUserById } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Shipping Address",
};
const ShippingAddress = async () => {
  const cart = await getMyCart();
  if (!cart || cart?.items?.length === 0)  return redirect("/cart");
  
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("No user Id found");
  
  const user = await getUserById(userId);
  return <>shipping address</>;
};

export default ShippingAddress;
