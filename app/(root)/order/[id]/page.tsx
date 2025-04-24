import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { shippingAddressType } from "@/types";
// import { shippingAddressType } from "@/types";

export const metadata: Metadata = {
  title: "Order Details",
  description: "Order Details",
};
const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) {
    return notFound();
  }
  // const shippingAddress = order.shippingAddress as shippingAddressType;
  return (
    <div>
      <OrderDetailsTable
        order={{
          ...order,
          user: {
            ...order.user,
            email: order?.user?.email || "no-email@gmail.com", // Ensure email is a non-null string
          },
          orderitems: order.orderitems,
          shippingAddress: order.shippingAddress as shippingAddressType,
        }}
      />
    </div>
  );
};

export default OrderDetailsPage;
