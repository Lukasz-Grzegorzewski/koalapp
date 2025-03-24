import { Product } from "../../sanity.types";

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        gap-4 mt-4
    "
    >
      <div>Products grid</div>
      <div>Product count : {products.length}</div>
    </div>
  );
}
