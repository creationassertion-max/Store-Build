import { sql } from "./db";
import type { Product, Category } from "./types";

export async function getCategories(): Promise<Category[]> {
  const rows = await sql`SELECT * FROM categories ORDER BY name`;
  return rows as Category[];
}

export async function getProducts(params?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  const { categorySlug, featured, limit } = params ?? {};

  let rows;
  if (categorySlug && featured !== undefined) {
    rows = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE c.slug = ${categorySlug} AND p.featured = ${featured}
      ORDER BY p.created_at DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;
  } else if (categorySlug) {
    rows = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE c.slug = ${categorySlug}
      ORDER BY p.created_at DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;
  } else if (featured !== undefined) {
    rows = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.featured = ${featured}
      ORDER BY p.created_at DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;
  } else {
    rows = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;
  }

  return rows.map((r) => ({ ...r, price: parseFloat(r.price) })) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const rows = await sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ${slug}
    LIMIT 1
  `;
  if (!rows.length) return null;
  const r = rows[0];
  return { ...r, price: parseFloat(r.price) } as Product;
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (!ids.length) return [];
  const rows = await sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = ANY(${ids})
  `;
  return rows.map((r) => ({ ...r, price: parseFloat(r.price) })) as Product[];
}

export async function createOrder(data: {
  stripeSessionId: string;
  customerEmail: string;
  total: number;
  items: object;
}): Promise<void> {
  await sql`
    INSERT INTO orders (stripe_session_id, status, customer_email, total, items)
    VALUES (${data.stripeSessionId}, 'paid', ${data.customerEmail}, ${data.total}, ${JSON.stringify(data.items)})
    ON CONFLICT (stripe_session_id) DO NOTHING
  `;
}

export async function getOrderBySessionId(sessionId: string) {
  const rows = await sql`
    SELECT * FROM orders WHERE stripe_session_id = ${sessionId} LIMIT 1
  `;
  return rows[0] ?? null;
}
