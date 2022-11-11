import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../_models/product.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  initProduct: Product = {
    id: 0,
    buying_price: 0,
    selling_price: 0,
    isActive:false,
    instock:false,
    name:'',
    quantity:0,
    reorder_level:0,
    status:'',
  };

  productSubject$ = new BehaviorSubject(this.initProduct);
  constructor() {}
}
