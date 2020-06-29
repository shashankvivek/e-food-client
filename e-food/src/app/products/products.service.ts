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

    const bananas: IProductGroup = {
      grpSkuId: 'banana',
      products: [
        {
          grpSkuId: 'banana',
          skuId: 'banana-1',
          title: 'Banana',
          description: 'Its a Yummy Yellow Apple',
          url:
            'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/banana.jpg',
          unitPriceL: 10,
          currency: '$',
          offerMessage: '',
          isOutOfStock: false,
          maxQuantity: 10,
          // unit : 'dozen'
        }
      ]
    };
    const pears: IProductGroup = {
      grpSkuId: 'pear',
      products: [
        {
          grpSkuId: 'pear',
          skuId: 'pear-1',
          title: 'Pears',
          description: 'Its a Pear',
          url:
            'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/pears.jpg',
          unitPriceL: 10,
          currency: '$',
          offerMessage: '',
          isOutOfStock: false,
          maxQuantity: 10,
        }
      ]
    };
    const oranges: IProductGroup = {
      grpSkuId: 'orange',
      products: [
        {
          grpSkuId: 'orange',
          skuId: 'orange-1',
          title: 'Oranges',
          description: 'Its a Tangy orange',
          url:
            'https://raw.githubusercontent.com/shashankvivek/e-food-client/master/e-food/src/assets/oranges.jpg',
          unitPriceL: 10,
          currency: '$',
          offerMessage: '',
          isOutOfStock: false,
          maxQuantity: 10,
        }
      ]
    };

    if (grpId === '1') {
        return of(apples);
    } else if (grpId === '2') {
        return of(bananas);
    } else if (grpId === '3') {
      return of(pears);
    } else if ( grpId === '4') {
      return of(oranges);
    }
  }
}
