import Link from "next/link";
import { Product } from "../../sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

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
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={urlFor(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100wv, (max-width: 1200px) 50wv, 33vw"
          />
        )}

        {isOutOfStock && (
          <div
            className="
            absolute inset-0
            flex items-center justify-center
             bg-[rgba(0,0,0,0.5)]
            "
          >
            <span className="font-bold text-lg text-white">Out of Stock</span>
          </div>
        )}
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
