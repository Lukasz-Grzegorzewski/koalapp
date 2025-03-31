"use server";

import { urlFor } from "@/sanity/lib/image";
import { BasketItemT } from "@/store/store";
import stripe from "@/stripe/stripe";

export type MetadataT = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItemT = {
  product: BasketItemT["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItemT[],
  metadata: MetadataT
) {
  try {
    const itemsWithouthPrice = items.filter((item) => !item.product.price);
    if (itemsWithouthPrice.length > 0) {
      throw new Error("Some product do not have price");
    }

    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: !customerId ? "always" : undefined,
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseUrl}/basket`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [urlFor(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session", error);
    throw error;
  }
}
