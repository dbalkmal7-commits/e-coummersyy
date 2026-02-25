import { Product } from "./product.type";

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  numOfCartItems?: number;
}

export interface CartApiResponse {
  status: string;
  numOfCartItems?: number;
  data: Cart;
}
