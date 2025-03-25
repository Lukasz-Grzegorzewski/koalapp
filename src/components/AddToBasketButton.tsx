"use client";

import { useEffect, useState } from "react";
import { Product } from "../../sanity.types";
import useBasketStore from "@/store/store";

type AddToBasketButtonProps = {
  product: Product;
  disabled?: boolean;
};

export default function AddToBasketButton({
  product,
  disabled,
}: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`
          flex items-center justify-center
          w-8 h-8 rounded-full transition-colors duration-200
          ${itemCount < 1 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}
        `}
        disabled={itemCount < 1 || disabled}
      >
        <span
          className={`
            text-xl font-bold 
            ${itemCount < 1 ? "text-gray-400" : "text-gray-600"}
          `}
        >
          -
        </span>
      </button>
      <div className="w-8 text-center font-semibold">{itemCount}</div>
      <button
        onClick={() => addItem(product)}
        className={`
          flex items-center justify-center
          w-8 h-8 rounded-full transition-colors duration-200
          ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}
        `}
        disabled={disabled}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
    </div>
  );
}
