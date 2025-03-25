import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function searchProductsByName(searchParam: string) {
  const ALL_PRODUCTS_BY_NAME_QUERY = defineQuery(
    `*[_type == "product"
      && name match $searchParam] | order(name asc)`
  );

  try {
    const products = await sanityFetch({
      query: ALL_PRODUCTS_BY_NAME_QUERY,
      params: {
        searchParam,
      },
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching productsByName", error);
    return [];
  }
}
