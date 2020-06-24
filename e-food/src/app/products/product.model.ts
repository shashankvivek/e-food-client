export interface IProduct {
  grpSkuId: string;
  skuId: string;
  title: string;
  description: string;
  url: string;
  unitPriceL: number;
  currency: string;
  offerMessage: string;
  isOutOfStock: boolean;
  maxQuantity: number;
}

export interface IProductGroup {
    grpSkuId: string;
    products: IProduct[];
}
