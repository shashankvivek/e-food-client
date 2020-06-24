import { IProduct, IProductGroup } from './product.model';
import { Injectable, NgModule } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor() {}

  getProductsByGroupId(grpId: string): Observable<IProductGroup> {
    const apples: IProductGroup = {
      grpSkuId: 'apple',
      products: [
        {
          grpSkuId: 'apple',
          skuId: 'apple-1',
          title: 'Red Apple',
          description: 'Its a Red Apple',
          url:
            'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/apple-1.png',
          unitPriceL: 10,
          currency: '$',
          offerMessage: '',
          isOutOfStock: false,
          maxQuantity: 10,
        },
        {
          grpSkuId: 'apple',
          skuId: 'apple-3',
          title: 'Green Apple',
          description: 'Its a Green Apple',
          url:
            'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/apple-3.jpg',
          unitPriceL: 15,
          currency: '$',
          offerMessage: '',
          isOutOfStock: false,
          maxQuantity: 5,
        },
      ]
    };

    if (grpId === 'apple') {
        return of(apples);
    }
  }
}
