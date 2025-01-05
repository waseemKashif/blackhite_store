import { Product } from "@/types";
import ProuductPrice from "./product-price";
import ProductRequest from "./product-request";
import { cn } from "@/lib/utils";
const ProductCheckStock = ({
  product,
  discountClass,
}: {
  product: Product;
  discountClass?: string;
}) => {
  return (
    <div>
      {product.stock ? (
        product?.discountedPrice ? (
          <div className="flex gap-x-4 ">
            <ProuductPrice
              price={product.discountedPrice}
              className={cn(
                "bg-none",
                discountClass
              )}
            />
            <ProuductPrice
              price={product.regularPrice}
              className="discounted-Price relative"
            />
          </div>
        ) : (
          <ProuductPrice price={product?.regularPrice} />
        )
      ) : (
        <div className=" flex-between sm:flex-row flex-col">
          <ProductRequest className="sm:block hidden" />
          <p className="text-destructive font-bold text-sm">Out Of Stock</p>
        </div>
      )}
    </div>
  );
};

export default ProductCheckStock;
