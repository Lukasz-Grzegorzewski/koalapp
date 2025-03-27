import { MetadataT } from "@/actions/createCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";
import stripe from "@/stripe/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const stripeSignature = headersList.get("stripe-signature");

  if (!stripeSignature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeWebhookSecret) {
    console.error("Stripe Webhook Secret is not set!");
    return NextResponse.json(
      { error: "Stripe Webhook Secret is not set!" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      stripeWebhookSecret
    );
  } catch (error) {
    console.error("Stripe signature verification failed.", error);
    return NextResponse.json(
      { error: `Webhook error: ${error}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log("Ordfer created in Sanity. ID :", order._id);
    } catch (error) {
      console.error("Error creating order in sanity.io :", error);
      return NextResponse.json(
        { error: "Error creating order in sanity.io!" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as MetadataT;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product).metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripeCustomerId: customer,
    clerkUserId,
    customerName,
    email: customerEmail,
    stripePaymentIntentId: payment_intent,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}
