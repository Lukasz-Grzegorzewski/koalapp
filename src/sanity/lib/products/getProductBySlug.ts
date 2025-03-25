import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getProductBySlug(slug: string) {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[
        _type == "product"
        && slug.current == $slug
      ] | order(name asc)[0]`
  );

  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });

    return products.data || null;
  } catch (error) {
    console.error("Error fetching productBySlug", error);
    return null;
  }
}
