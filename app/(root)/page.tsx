import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";
// export const metadata = {
//   title: "Home",
// };
const Homepage = () => {
  return (
    <>
      <ProductList data={sampleData.products} title="New Arrival" limit={4} />
    </>
  );
};

export default Homepage;
