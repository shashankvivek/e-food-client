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
