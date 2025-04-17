import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { shippingAddressType } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProuductPrice from "@/components/shared/product/product-price";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Place Order",
  description: "Place your order",
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  if (!cart || !cart.items || cart.items.length === 0) {
    redirect("/cart");
  }
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not found");
  }
  const user = await getUserById(userId);
  if (!user) {
    redirect("/login");
  }
  if (!user.address) {
    redirect("/shipping-address");
  }
  if (!user.paymentMethod) {
    redirect("/payment-method");
  }
  const userAddress = user.address as shippingAddressType;
  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className="py-4 text-2xl ">Place order</h1>
      <div className=" grid md:grid-cols-3 md:gap-5">
        <div className="md:col-span-2  overflow-x-auto space-y-4">
          <Card className="p-4">
            <h2 className=" font-semibold md:text-xl mb-2">Shipping Address</h2>
            <div className="flex flex-col gap-1">
              <p>
                <span>Name:</span> {userAddress.fullName}
              </p>
              <p>
                <span>Address:</span> {userAddress.streetAddress}{" "}
                {userAddress.city} {userAddress.country} ,{" "}
                {userAddress.postalCode}{" "}
              </p>
              <p>
                <span>Phone No:</span> {userAddress.phone}
              </p>
            </div>
            <div className="mt-3">
              <Link
                href={"/shipping-address"}
                className="text-blue-500"
                title="Edit Address"
              >
                <Button variant={"outline"} aria-label="Edit Address">
                  Edit Address
                </Button>
              </Link>
            </div>
          </Card>
          <Card className="p-4">
            <h2 className=" font-semibold md:text-xl mb-2">Payment Method</h2>
            <div className="flex flex-col gap-1">
              <p>
                <span>Payment Method:</span> {user.paymentMethod}
              </p>
            </div>
            <div className="mt-3">
              <Link
                href={"/payment-method"}
                className="text-blue-500"
                title="Change Payment Method"
              >
                <Button variant={"outline"} aria-label="Change Payment Method">
                  Change Payment Method
                </Button>
              </Link>
            </div>
          </Card>
          <Card className="p-4">
            <h2 className=" font-semibold md:text-xl mb-2">Order Items</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
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
            {/* <div className="flex flex-col gap-1">
              {cart.items.map((item) => (
                <div key={item.slug} className="flex justify-between gap-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                    width={64}
                    height={64}
                  />
                  <p className=" flex-1 line-clamp-2">{item.name}</p>{" "}
                  {item.discountedPrice ? (
                    <ProuductPrice price={item.discountedPrice} />
                  ) : (
                    <ProuductPrice price={item.regularPrice} />
                  )}
                </div>
              ))}
            </div> */}

            <div className="mt-3">
              <Link href={"/cart"} className="text-blue-500" title="Go to Cart">
                <Button variant={"outline"} aria-label="Go to Cart">
                  Go to Cart
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className=" p-4 space-y-4 gap-4">
              <div className=" flex  justify-between">
                <div>items Price</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>
              <div className=" flex  justify-between">
                <div>Shipping Price</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              {cart.discountedPrice && Number(cart.discountedPrice) > 0 && (
                <div className=" flex  justify-between">
                  <div>Discount</div>
                  <div>
                    {formatCurrency(
                      cart.discountedPrice ? cart.discountedPrice : ""
                    )}
                  </div>
                </div>
              )}
              <div className=" flex  justify-between">
                <div>Total</div>
                <div>{formatCurrency(cart.totalPriceotal)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
