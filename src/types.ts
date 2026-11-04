export interface Product {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  category: string;
  tagline: string;
  gradient: string;
  accentColor: string;
  specs: string[];
  sizes: string[];
  badge?: string;
  description: string;
}

export interface CartItem {
  id: string; // unique cart entry id (productId + size)
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  gradient: string;
}
