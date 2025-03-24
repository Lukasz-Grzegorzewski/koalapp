import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Set to false if statically generating pages, using ISR or tag-based revalidation
  useCdn: true,
  //  click-to-edit features in Sanity
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_VERCEL_URL
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/studio`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  },
});
