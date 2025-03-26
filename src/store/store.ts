import { Product } from "../../sanity.types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BasketItemT = {
  product: Product;
  quantity: number;
};

type BasketStateT = {
  items: BasketItemT[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItemT[];
};

const useBasketStore = create<BasketStateT>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items
            .map((item: BasketItemT) => {
              if (item.product._id === productId)
                if (item.quantity > 1)
                  return { ...item, quantity: item.quantity - 1 };
                else return undefined;
              return item;
            })
            .filter((item) => !!item),
        })),
      clearBasket: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },
      getItemCount: (productId: string) => {
        const item = get().items.find((i) => i.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store",
      storage: createJSONStorage(() => sessionStorage), // not necessary because it is a default anyway
    }
  )
);

export default useBasketStore;
