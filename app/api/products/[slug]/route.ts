import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/queries";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ product: null }, { status: 404 });
  }
  return NextResponse.json({ product });
}
