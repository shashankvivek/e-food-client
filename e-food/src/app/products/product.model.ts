export interface IProduct {
  bcId: number;
  currency: string;
  description: string;
  imageUrl: string;
  name: string;
  productId: number;
  scId: number;
  unitPrice: number;
  isAvailable: boolean;
  isAddedToCart?: boolean;
}
export interface IAddedToCartEvent {
  product: IProduct;
  quantity: number;
}

export interface IAddToCartRequest {
  productId: number;
  totalQty: number;
}

