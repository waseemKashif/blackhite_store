// import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
// export const metadata = {
//   title: "Home",
// };
const Homepage = async () => {
  const latestProducts = await getLatestProducts()
  return (
    <>
      <ProductList data={latestProducts} title="New Arrival" limit={4} />
    </>
  );
};

export default Homepage;
