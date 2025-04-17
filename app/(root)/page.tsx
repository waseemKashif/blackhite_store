// import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProducts,
  getProductsByCategory,
} from "@/lib/actions/product.actions";
// export const metadata = {
//   title: "Home",
// };
const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const mensSweatShirtCat = await getProductsByCategory("Men's Sweatshirts");
  const mobilePhones = await getProductsByCategory("Mobile Phones");
  return (
    <>
      <ProductList data={latestProducts} title="New Arrival" limit={4} />
      <ProductList data={mensSweatShirtCat} title="Mens Sweat Shirts" />
      <ProductList data={mobilePhones} title="Mobile Phones" />
    </>
  );
};

export default Homepage;
