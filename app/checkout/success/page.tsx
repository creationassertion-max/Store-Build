import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Order Confirmed",
  description: "Your LUMIÈRE order has been confirmed.",
};

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <CheckCircle className="w-16 h-16 text-lumiere-gold mx-auto mb-6" />
      <h1 className="font-serif text-4xl text-lumiere-text mb-4">
        Your order is confirmed.
      </h1>
      <p className="text-lumiere-muted text-lg leading-relaxed mb-8">
        Thank you for choosing LUMIÈRE. A confirmation email is on its way.
        Your ritual is about to begin.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="inline-block bg-lumiere-text text-lumiere-bg px-8 py-4 text-xs tracking-widest uppercase hover:bg-lumiere-gold transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-block border border-lumiere-border text-lumiere-text px-8 py-4 text-xs tracking-widest uppercase hover:border-lumiere-gold hover:text-lumiere-gold transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
