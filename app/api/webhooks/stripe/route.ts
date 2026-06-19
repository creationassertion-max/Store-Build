import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createOrder } from "@/lib/queries";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await createOrder({
        stripeSessionId: session.id,
        customerEmail: session.customer_details?.email ?? "",
        total: (session.amount_total ?? 0) / 100,
        items: session.metadata ?? {},
      });
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  }

  return NextResponse.json({ received: true });
}
