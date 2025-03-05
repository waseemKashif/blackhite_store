"use client";
import { Cart } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
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
import { LoaderCircle, Minus, Plus, ArrowRight } from "lucide-react";
import ProuductPrice from "@/components/shared/product/product-price";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Item } from "@radix-ui/react-dropdown-menu";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isPendingPlus, startTransitionPlus] = useTransition();
  const makingFinalPrice = (price: number, quantity: number) => {
    const finalPrice = (Number(price) * Number(quantity)).toFixed(2);
    return (
      <ProuductPrice price={finalPrice.toString()} className=" text-right" />
    );
  };
  return (
    <>
      <h1 className="h2-bold py-4 ">Shopping cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          cart is empty <Link href="/">Go to homepage</Link>
        </div>
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
                {cart?.items?.map((item) => (
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
                        disabled={isPending}
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
                      {item.regularPrice &&
                        makingFinalPrice(Number(item.regularPrice), item.qty)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal ({cart?.items.reduce((acc, item) => acc + item.qty, 0)}{" "}
                ):
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
