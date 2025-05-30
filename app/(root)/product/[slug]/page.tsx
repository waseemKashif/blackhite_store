import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import ProductCheckStock from "@/components/shared/product/product-checkStock";
import ProuductPrice from "@/components/shared/product/product-price";
import ProductImages from "@/components/shared/product/product-images";
import AddToCart from "@/components/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.actions";
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

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props?.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const cart = await getMyCart();
  let priceCut;
  if (product.discountedPrice) {
    priceCut = product.discountedPrice
      ? Number(product.regularPrice) - Number(product.discountedPrice)
      : 0;
  }
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* images column 2 of 5 columns */}
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>
          <div className="col-span-2 p-5">
            {/* details of product */}
            <div className="flex flex-col gap-4">
              <div>
                <Badge>{product.brand} </Badge> {product.category}
              </div>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} Reviews
              </p>
              <ProductCheckStock
                product={product}
                discountClass="bg-green-100 text-green-600 rounded-full px-4 py-2 w-fit leading-5 font-bold"
              />
              <h3>
                {" "}
                Description:
                {product.description}
              </h3>
            </div>
          </div>
          <div>
            <Card>
              <CardContent className=" p-4">
                <div className="mb-2 flex justify-between">
                  <div className=" text-gray-500">Price</div>
                  <div>
                    <ProuductPrice price={product.regularPrice} />
                  </div>
                </div>
                {priceCut && (
                  <div className="mb-2 flex justify-between">
                    <div className=" text-gray-500">Discount</div>
                    <div>
                      <ProuductPrice
                        price={priceCut.toFixed(2).toString()}
                        className=" text-red-500"
                      />
                    </div>
                  </div>
                )}
                {product.stock > 0 ? (
                  <div className="mb-2 flex justify-between">
                    <div className=" text-gray-500">Stock</div>
                    <Badge variant="default" className=" bg-green-600">
                      {" "}
                      In Stock
                    </Badge>
                  </div>
                ) : (
                  <div className="mb-2 flex justify-between">
                    <div className=" text-gray-500">Stock</div>
                    <Badge variant="destructive">Out Of Stock</Badge>
                  </div>
                )}
                {product.discountedPrice && (
                  <div className="mb-2 flex justify-between">
                    <div className=" text-gray-900 font-bold">Total</div>
                    <ProuductPrice
                      price={product.discountedPrice}
                      className=" text-black font-bold"
                    />
                  </div>
                )}
                {product.stock > 0 && (
                  <div className=" flex-center">
                    <AddToCart
                      cart={
                        cart
                          ? { ...cart, totalPrice: cart.totalPrice.toString() }
                          : undefined
                      }
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        regularPrice: product.regularPrice,
                        qty: 1,
                        image: product.images[0],
                        discountedPrice:
                          product.discountedPrice || product.regularPrice,
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
