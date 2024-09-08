// src/lib/types.ts

import { FILTER_OPTIONS } from "./utils";

export interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
  tags: string[];
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type FilterOption = (typeof FILTER_OPTIONS)[number];
