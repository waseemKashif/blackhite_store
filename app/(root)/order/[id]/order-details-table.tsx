import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime, formatUuid } from "@/lib/utils";
import { orderType } from "@/types";
import Image from "next/image";
const OrderDetailsTable = ({ order }: { order: orderType }) => {
  // destructure the order object to get the order items and other details
  const {
    shippingAddress,
    orderitems,
    totalPrice,
    shippingPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    id,
    paidAt,
    deliveredAt,
  } = order;
  // const { orderitems, shippingAddress } = order;
  return (
    <div>
      <h1 className="text-2xl medium py-4" title={order.id}>
        {" "}
        Order {formatUuid(order.id)}
      </h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 overflow-x-auto space-y-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className=" text-xl pb-4 ">Payment Method</h2>
              <p>{paymentMethod}</p>
              <div>
                <span>Status </span>{" "}
                {isPaid ? (
                  <Badge variant="secondary" className="text-green-500">
                    Paid on {formatDateTime(paidAt!).dateTime}
                  </Badge>
                ) : (
                  <Badge variant="destructive">Not Paid</Badge>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className=" text-xl pb-4 ">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.streetAddress}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              <p>Phone: {shippingAddress.phone}</p>
              <div>
                <span>Status </span>{" "}
                {isDelivered ? (
                  <Badge variant="secondary" className="text-green-500">
                    Delivered at {formatDateTime(deliveredAt!).dateTime}
                  </Badge>
                ) : (
                  <Badge variant="destructive">Not Delivered</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTable;
