// import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProducts,
  getProductsByBrand,
  getProductsByCategory,
} from "@/lib/actions/product.actions";
import HomePageSlider from "@/components/homepage-slider";
import { getBanners } from "@/lib/actions/banners.actions";
import { getAllCategories } from "@/lib/actions/categories.actions";
import Categories from "@/components/allCategories";
// export const metadata = {
//   title: "Home",
// };
const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const mensSweatShirtCat = await getProductsByCategory("Men's Sweatshirts");
  // const mobilePhones = await getProductsByCategory("Mobile-Phones");
  const banners = await getBanners();
  const categories = await getAllCategories();
  const brandProducts = await getProductsByBrand('apple');
  return (
    <>
      <HomePageSlider
        data={banners}
        delay={5000}
        stopInteraction={true}
        loop={true}
        navigation={true}
      />
      <Categories categories={categories} />
      <ProductList data={latestProducts} title="New Arrival" limit={4} />
      <ProductList data={brandProducts} title="Apple Products"/>
      <ProductList data={mensSweatShirtCat} title="Mens Sweat Shirts" />
      {/* <ProductList data={mobilePhones} title="Mobile Phones" /> */}
    </>
  );
};

export default Homepage;
