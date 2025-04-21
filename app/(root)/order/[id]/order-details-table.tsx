import { orderType } from "@/types";
import Image from "next/image";
const OrderDetailsTable = ({ order }: { order: orderType }) => {
  return (
    <>
      order details table {order.user.name} <br />
      mobile no : {order?.shippingAddress?.phone} <br />
      address : {order?.shippingAddress?.streetAddress} <br />
      city : {order?.shippingAddress?.city} <br />
      country : {order?.shippingAddress?.country} <br />
      postal code : {order?.shippingAddress?.postalCode} <br />
      order items :{" "}
      {order?.orderitems?.map((item) => (
        <div key={item.slug}>
          <Image src={item.image} alt={item.name} width={50} height={50} />
          <p>Product Name: {item.name}</p>
          <p>Quantity: {item.qty}</p>
          <p>
            Price:{" "}
            {item.discountedPrice ? item.discountedPrice : item.regularPrice}
          </p>
        </div>
      ))}
      <p>Order Total: {order?.totalPrice}</p>
    </>
  );
};

export default OrderDetailsTable;
