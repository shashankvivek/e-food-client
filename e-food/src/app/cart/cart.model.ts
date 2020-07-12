export interface IItem {
  currency: string;
  imageUrl: string;
  productId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
}

export interface IOfferItem {
  actualPrice: number;
  discountPercent: number;
  discountedPrice: number;
  items: IItem[];
  ruleSetId: string;
}

export interface IBillableCart {
  couponId?: string;
  currency: string;
  items: IItem[];
  offerItems: IOfferItem[];
  totalPrice: number;
  totalSaving: number;
}
