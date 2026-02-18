export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  timestamp: number;
}

export interface AIScanResult {
  className: string;
  probability: number;
}
