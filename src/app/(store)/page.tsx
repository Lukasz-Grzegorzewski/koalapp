import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <>
      <BlackFridayBanner />
      <div
        className="
          flex flex-col items-center justify-top
          min-h-screen bg-gray-100 p-4
        "
      >
        <ProductsView products={products} categories={categories} />
      </div>
    </>
  );
}
