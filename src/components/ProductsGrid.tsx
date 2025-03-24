"use client";

import { Product } from "../../sanity.types";
import { AnimatePresence, motion } from "motion/react";
import ProductThumb from "./ProductThumb";

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        gap-4 mt-4
    "
    >
      {products?.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div
            key="modal"
            layout
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <ProductThumb product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}
