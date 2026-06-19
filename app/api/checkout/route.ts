import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductsByIds } from "@/lib/queries";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cartItems: Array<{ id: number; quantity: number }> = body.items;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const productIds = cartItems.map((i) => i.id);
    const products = await getProductsByIds(productIds);

    if (products.length === 0) {
      return NextResponse.json(
        { error: "Products not found" },
        { status: 400 }
      );
    }

    const lineItems = cartItems.flatMap((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return [];
      return [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description.substring(0, 500),
              images: [],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: cartItem.quantity,
        },
      ];
    });

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "No valid products" },
        { status: 400 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "FR", "DE", "JP"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1500, currency: "usd" },
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],
      metadata: {
        product_ids: productIds.join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
