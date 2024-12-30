import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types";
import ProductCheckStock from "./product-checkStock";

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
        <ProductCheckStock
          product={product}
          discountClass=" text-destructive font-bold"
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
