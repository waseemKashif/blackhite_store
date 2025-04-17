import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {  Product } from "@/types";
import ProductCheckStock from "./product-checkStock";
import AddToCart from "./add-to-cart";
import { getMyCart } from "@/lib/actions/cart.actions";
const ProductCard = async ({ product }: { product: Product }) => {
  const cart = await getMyCart();
  return (
    <Card className=" w-full max-w-sm">
      <CardHeader className=" p-0  items-center ">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
            className=" rounded-md"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className=" text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2
            className="text-sm font-medium overflow-ellipsis line-clamp-2 h-11"
            title={product.name}
          >
            {product.name}
          </h2>
        </Link>
        <ProductCheckStock
          product={product}
          discountClass=" text-destructive font-bold"
        />
      {product.stock > 0 && (
        <div className=" flex-center">
          <AddToCart
            cart={
              cart
                ? { ...cart, totalPrice: cart.totalPrice.toString() }
                : undefined
            }
            item={{
              productId: product.id,
              name: product.name,
              slug: product.slug,
              regularPrice: product.regularPrice,
              qty: 1,
              image: product.images[0],
              discountedPrice: product.discountedPrice || product.regularPrice,
            }}
          />
        </div>
      )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
