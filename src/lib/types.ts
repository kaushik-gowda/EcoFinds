
export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  category: string;
  reviews: Review[];
  stock: number;
  userId?: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type CartItem = {
  id:string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  userId: string;
};
