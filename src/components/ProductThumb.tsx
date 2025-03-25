import Link from "next/link";
import { Product } from "../../sanity.types";
import ProductThumbImage from "./ProductThumbImage";

export default function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`
        group
        flex flex-col
        shadow-sm rounded border bg-white  border-gray-200
        hover:shadow-md
        transition-all duration-200 overflow-hidden
        ${isOutOfStock ? "opacity-50" : ""}
      `}
    >
      <div className="relative aspect-square w-full h-full overflow-hidden">
        <ProductThumbImage isOutOfStock={isOutOfStock} product={product} />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
            )
            .join(" ") || "No description available"}
        </p>

        <p className="mt-2 text-lg font-bold text-gray-900">
          €{product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
