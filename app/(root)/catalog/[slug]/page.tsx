import { Metadata } from "next";
import { getProductsByCategory } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import ProductCard from "@/components/shared/product/product-card";
type Props = {
  params: {
    slug: string;
  };
};
export async function generateMetadata(props : Props): Promise<Metadata> {
  const { slug } = await props.params;
  const title = `${
    slug.charAt(0).toUpperCase() + slug.slice(1) 
  } | Ansar Gallery`;

  return {
    title,
  };
}
const CatalogPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const data = await getProductsByCategory(slug);
  if (!data || data.length < 1)
    return <div>Products comming soon.</div>;
  if (!data) return notFound();
  return (
    <div>
      <h1 className=" text-2xl font-bold mb-4">{slug}</h1>
      <div className=" grid md:grid-cols-6 gap-4">
        {data.map((item) => (
          <ProductCard product={item} key={item.name} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
