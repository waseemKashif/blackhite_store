import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProuductPrice from "./product-price";
import ProductRequest from "./product-request";
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
 
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
      <CardContent>
        <div className=" text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2
            className="text-sm font-medium overflow-ellipsis line-clamp-2 h-11"
            title={product.name}
          >
            {product.name}
          </h2>
        </Link>
        <div className="flex flex-col">
          {product.stock ? (
            product.price.discountedPrice ? (
              <div className="flex gap-x-4 ">
                <ProuductPrice
                  price={product.price.discountedPrice}
                  className=" text-destructive font-bold "
                />
                <ProuductPrice
                  price={product.price.regularPrice}
                  className="discounted-Price relative"
                />
              </div>
            ) : (
              <ProuductPrice price={product.price.regularPrice} />
            )
          ) : (
            <div className=" flex-between">
              <ProductRequest />
              <p className="text-destructive font-bold text-sm">Out Of Stock</p>
            </div>
          )}
          <p>{product.rating} Stars</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
