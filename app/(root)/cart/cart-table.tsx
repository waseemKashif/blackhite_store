"use client";
import { Cart } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import {
  addItemToCart,
  getMyCart,
  removeAllItemsFromCart,
  removeItemFromCart,
} from "@/lib/actions/cart.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle, Minus, Plus, ArrowRight, Loader } from "lucide-react";
import ProuductPrice from "@/components/shared/product/product-price";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoadingPage from "@/app/loading";
const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDelAllPending, setDelAllPending] = useTransition();
  const [isPendingPlus, startTransitionPlus] = useTransition();
  const [isProceedPending, startProceedTransition] = useTransition();
  const makingFinalPrice = (price: number, quantity: number) => {
    const finalPrice = (Number(price) * Number(quantity)).toFixed(2);
    return (
      <ProuductPrice price={finalPrice.toString()} className=" text-right" />
    );
  };
  const no_of_items = cart?.items.reduce((acc, item) => acc + item.qty, 0);
  const handleRemoveCart = async () => {
    setDelAllPending(async () => {
      const res = await removeAllItemsFromCart();
      cart = await getMyCart();
      if (!res.success) {
        toast({
          variant: "destructive",
          description: "Unable to delete all",
        });
      } else {
        toast({
          variant: "default",
          description: res.message,
        });
      }
    });
  };
  return (
    <div>
      <h1 className="h2-bold py-4 ">Shopping cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          cart is empty <Link href="/">Go to homepage</Link>
        </div>
      ) : isDelAllPending ? (
        <LoadingPage />
      ) : (
        <div className=" grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className=" text-center">Quantity</TableHead>
                  <TableHead className=" text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!isDelAllPending &&
                  cart?.items?.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center "
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            height={77}
                            width={75}
                            priority={true}
                            className=" rounded-md"
                          />
                          <span className=" max-w-[300px] overflow-ellipsis line-clamp-2">
                            {item.name}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell className=" flex-center gap-2">
                        <Button
                          disabled={isPending}
                          variant={"outline"}
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              const res = await removeItemFromCart(
                                item.productId
                              );
                              if (!res.success) {
                                toast({
                                  variant: "destructive",
                                  description: res.message,
                                });
                              }
                            });
                          }}
                        >
                          {isPending ? (
                            <LoaderCircle size={20} className=" animate-spin" />
                          ) : (
                            <Minus size={20} />
                          )}
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          disabled={isPendingPlus}
                          variant={"outline"}
                          type="button"
                          onClick={() => {
                            startTransitionPlus(async () => {
                              const res = await addItemToCart(item);
                              if (!res.success) {
                                toast({
                                  variant: "destructive",
                                  description: res.message,
                                });
                              }
                            });
                          }}
                        >
                          {isPendingPlus ? (
                            <LoaderCircle size={20} className=" animate-spin" />
                          ) : (
                            <Plus size={20} />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className=" text-right">
                        {item.discountedPrice !== item.regularPrice ? (
                          <div>
                            {makingFinalPrice(
                              Number(item.discountedPrice),
                              item.qty
                            )}
                            <span className=" line-through text-muted-foreground decoration-red-500 decoration-2">
                              {makingFinalPrice(
                                Number(item.regularPrice),
                                item.qty
                              )}
                            </span>
                          </div>
                        ) : (
                          <div>
                            {makingFinalPrice(
                              Number(item.regularPrice),
                              item.qty
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="  inline-flex justify-end w-full border-t pt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Delete All</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your all items from your cart.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit" onClick={handleRemoveCart}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div>
            <Card
              className={`${
                Number(cart.itemsPrice) < 100 ? "" : " border-green-400"
              }`}
            >
              <CardContent className="p-4 gap-4">
                <div className="pb-3 text-lg flex justify-between ">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    {formatCurrency(cart.itemsPrice)}
                  </span>
                </div>
                <div className=" flex justify-between mb-2">
                  <span>No of Items</span>
                  <span>{no_of_items}</span>
                </div>
                <div className=" flex justify-between mb-2">
                  <span>Shipping Price</span>
                  <span>
                    {Number(cart.shippingPrice) > 0 ? (
                      formatCurrency(cart.shippingPrice)
                    ) : (
                      <span className=" text-green-700"> Free Shipping</span>
                    )}
                  </span>
                  {/* <span>Calculated at checkout</span> */}
                </div>
                {cart.discountedPrice && Number(cart.discountedPrice) > 0 && (
                  <div className=" flex justify-between mb-2">
                    <span>Discount</span>
                    <span>{formatCurrency(cart.discountedPrice)}</span>
                  </div>
                )}
                <div className=" flex justify-between mb-2 font-bold text-xl">
                  <span>Total</span>
                  <span>{formatCurrency(cart.totalPrice)}</span>
                </div>
                <Button
                  className=" w-full mt-3"
                  disabled={cart?.items?.length === 0 || isProceedPending}
                  onClick={
                    () =>
                      startProceedTransition(() => router.push("/place-order"))
                    // startTransition(() => router.push("/shipping-address"))
                  }
                >
                  {isProceedPending ? (
                    <Loader size={20} className=" animate-spin" />
                  ) : (
                    <ArrowRight size={20} />
                  )}{" "}
                  Proceed to checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTable;
