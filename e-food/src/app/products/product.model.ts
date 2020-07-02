export interface IProduct {
  bcId: number;
  currency: string;
  description: string;
  imageUrl: string;
  name: string;
  productId: number;
  scId: number;
  unitPrice: number;
  unitsInStock: number;
}
export interface IAddedToCartEvent {
  product: IProduct;
  quantity: number;
}

export interface IAddToCartRequest {
  productId: number;
  quantity: number;
}

export interface IAddedCartResponse {
  success: boolean;
  message: string;
}
