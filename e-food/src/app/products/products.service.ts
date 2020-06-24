import { Injectable, NgModule } from '@angular/core';


@Injectable()
export class ProductsService {

    constructor() {}

    getProductsByGroupId() {
        const apples = {
            grpSkuId: 'apple',
            products : [
            {
                grpSkuId: 'apple',
                skuId: 'apple-1',
                title: 'Red Apple',
                description: 'Its a Red Apple',
                url : '',
                unitPriceL: 10,
                currency: '$',
                offerMessage: '',
                isOutOfStock: false,
                maxQunatity: 10
            }
            ]
        };
    }
}
