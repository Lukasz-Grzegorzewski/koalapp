import { Category, Product } from "../../sanity.types";
import ProductsGrid from "./ProductsGrid";

type ProductsViewProps = {
  products: Product[];
  categories: Category[];
};

export default function ProductsView({
  products,
  categories,
}: ProductsViewProps) {
  return (
    <div className="flex flex-col">
      {/* categories */}
      Categories count : {categories.length}
      {/* products */}
      <ProductsGrid products={products} />
    </div>
  );
}
