import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Product } from "../../sanity.types";

export default function ProductThumbImage({
  product,
  isOutOfStock,
}: {
  product: Product;
  isOutOfStock: boolean;
}) {
  return (
    <>
      {product.image && (
        <Image
          className="object-contain transition-transform duration-300 group-hover:scale-105 p-6"
          src={urlFor(product.image).url()}
          alt={product.name || "Product image"}
          fill
          priority
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
    </>
  );
}
