import ProuductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import { CheckCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatUuid } from "@/lib/utils";
import { orderType } from "@/types";
import Image from "next/image";
import Link from "next/link";
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
    paidAt,
    deliveredAt,
    itemsPrice,
  } = order;

  return (
    <div>
      <h1 className="text-2xl medium py-4 flex gap-1 items-center" title={order.id}>
        {" "}
        Order {formatUuid(order.id)} <CheckCheck className=" text-green-600"/>
      </h1>
      <div className="grid md:grid-cols-3 md:gap-5 gap-2">
        <div className="md:col-span-2 overflow-x-auto md:space-y-4  space-y-2">
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
          <Card className="p-4">
            <h2 className=" font-semibold md:text-xl mb-2">Ordered Items</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderitems.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center gap-2"
                        title={item.name}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                          width={64}
                          height={64}
                        />
                        <span className="  max-w-64 line-clamp-2 px-2">
                          {item.name}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <span>{item.qty}</span>
                    </TableCell>
                    <TableCell>
                      {item.discountedPrice ? (
                        <ProuductPrice
                          price={item.discountedPrice}
                          className=" sm:text-xl"
                        />
                      ) : (
                        <ProuductPrice price={item.regularPrice} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className=" p-4 space-y-4 gap-4 w-full">
              <div className=" flex  justify-between">
                <div>Items Price</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className=" flex  justify-between">
                <div>Shipping Price</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className=" flex  justify-between font-bold text-xl">
                <span >Total</span>
                <span >{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTable;
