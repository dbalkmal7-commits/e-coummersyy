export interface Order {
  _id: string;
  user: string;
  cart: string;
  totalOrderPrice: number;
  shippingAddress?: {
    details: string;
    phone: string;
    city: string;
  };
  isPaid: boolean;
  isDelivered?: boolean;
  paidAt?: string;
  createdAt: string;
}

export interface OrdersApiResponse {
  status: string;
  results?: number;
  data: Order[];
}
