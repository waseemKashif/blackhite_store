import ProductCard from "./product-card";
import { Product } from "@/types";
const ProductList = ({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-6">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {limitedData.map((product:Product) => (
          <ProductCard product={product} key={product.slug}/>
          ))}
        </div>
      ) : (
        <p>Opss! No Products found</p>
      )}
    </div>
  );
};

export default ProductList;
