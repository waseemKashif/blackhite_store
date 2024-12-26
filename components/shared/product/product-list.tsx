import ProductCard from "./product-card";
const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {limitedData.map((product: any) => (
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
