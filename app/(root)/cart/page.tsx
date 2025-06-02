import CartTable from "./cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";
export const metadata = {
  title: "Shopping Cart",
  description: "Cart page",
};
const CartPage = async () => {
  const cart = await getMyCart();
  return (
    <>
      <CartTable cart={cart ? { ...cart, totalPrice: cart.totalPrice.toString() } : undefined}  />
    </>
  );
};

export default CartPage;
