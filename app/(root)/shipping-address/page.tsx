import { auth } from "@/auth_copy_lightweight";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { shippingAddressType } from "@/types";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingAddressForm from "./shipping-address-form";
import CheckoutSteps from "@/components/shared/checkout-steps";
export const metadata: Metadata = {
  title: "Shipping Address",
};
const ShippingAddress = async () => {
  const cart = await getMyCart();
  if (!cart || cart?.items?.length === 0) return redirect("/cart");

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("No user Id found");

  const user = await getUserById(userId);
  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as shippingAddressType} />
    </>
  );
};

export default ShippingAddress;
