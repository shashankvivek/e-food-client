export interface ICartSuccessResponse {
  success: boolean;
  message: string;
  qtyAdded: number;
}

export interface ISuccessResponse {
  success: boolean;
  message: string;
}

export interface IUserTokenPayload {
  authorized: boolean;
  exp: number;
  fname: string;
  lname: string;
  user: string;
  isCustomer?: boolean;
}


export interface ICartItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  imageUrl: string;
  currency: string;
}
