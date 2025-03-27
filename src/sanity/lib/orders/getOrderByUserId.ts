import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getOrdersByUserId(userId: string) {
  const ORDERS_BY_USER_ID_QUERY = defineQuery(
    `*[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      ...,
      products[]{
        ...,
        product->
      }
    }`
  );

  try {
    const orders = await sanityFetch({
      query: ORDERS_BY_USER_ID_QUERY,
      params: { userId },
    });

    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders by userId", error);
    return [];
  }
}
