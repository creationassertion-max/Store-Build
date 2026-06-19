export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  story: string;
  price: number;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  sku: string;
  image_path: string;
  seo_title: string;
  seo_description: string;
  in_stock: boolean;
  featured: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_path: string;
  slug: string;
}

export interface Order {
  id: number;
  stripe_session_id: string;
  status: string;
  customer_email: string;
  total: number;
  items: CartItem[];
  created_at: string;
}
