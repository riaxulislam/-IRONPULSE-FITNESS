export interface ProductDetails {
  description: string;
  materials: string;
  usage: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  category: 'apparel' | 'gear' | 'nutrition' | 'tech';
  primaryImage: string;
  hoverImage: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  badge?: string; // e.g., 'NEW', 'SALE', 'BEST SELLER'
  features: string[];
  colors: string[];
  sizes: string[];
  details: ProductDetails;
}

export interface CartItem {
  id: string; // unique cart item key generated from: productId-color-size
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Benefit {
  icon: 'strength' | 'result' | 'trust';
  title: string;
  desc: string;
}

export type Page = 'home' | 'shop' | 'product' | 'about' | 'contact';
