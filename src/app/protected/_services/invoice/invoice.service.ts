import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agent } from '../../_models/agent.model';
import { Customer } from '../../_models/customer.model';
import { Invoice } from '../../_models/invoice.model';
import { Product } from '../../_models/product.model';

const PRODUCT_API = `${environment.apiUrl}/inventories`;

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  initProducts: Product[] = [];
  currentCart: Product[] = [];

  agentInit: Agent = {
    name: '',
    email: '',
    mobile: '',
  };

  customerInit: Customer = {
    name: '',
    mobile: '',
    email: '',
    agent: this.agentInit,
  };

  initCart: Product = {
    id: 0,
    name: '',
    quantity: 1,
    buyingPrice: 0,
    sellingPrice: 0,
    inStock: true,
    reOrderLevel: 0,
    status: '',
    isActive: true,
  };

  initInvoice: Invoice = {
    total: 0,
    subtotal: 0,
    number: '',
    tax: 0,
    discount: 0,
    isApproved: false,
    approvedBy: '',
    taxAmount: 0,
    discountAmount: 0,
    isActive: true,
    reason: '',
    cart: this.initProducts,
    customer: this.customerInit,
  };

  currentInvoice: Invoice = {
    total: 0,
    subtotal: 0,
    number: '',
    tax: 0,
    discount: 0,
    isApproved: false,
    approvedBy: '',
    taxAmount: 0,
    discountAmount: 0,
    isActive: true,
    reason: '',
    cart: this.initProducts,
    customer: this.customerInit,
  };

  productSubject$ = new BehaviorSubject(this.initProducts);

  cartSubject$ = new BehaviorSubject(this.initProducts);

  invoiceSubject$ = new BehaviorSubject(this.initInvoice);
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_API);
  }

  generateInvoiceId() {}

  removeProduct(id: number) {
    const existingProduct = this.currentCart.find((data) => data.id == id);

    if (existingProduct) {
      const existingProducts = this.currentCart.filter((data) => id != data.id);

      this.currentCart = existingProducts;
      this.cartSubject$.next(existingProducts);
    }
    this.addInvoice();
  }

  addProduct(nproduct: Product, quantity: number, type: number) {
    const existingProduct = this.currentCart.find(
      (data) => nproduct.id == data.id
    );

    if (existingProduct) {
      const existingProducts = this.currentCart.filter(
        (data) => nproduct.id != data.id
      );
      if (type == 0) {
        existingProduct.quantity += 1;
      } else {
        existingProduct.quantity = quantity;
      }

      existingProducts.push(existingProduct);
      this.currentCart = existingProducts;
      this.cartSubject$.next(existingProducts);
    } else {
      nproduct.quantity = 1;
      this.currentCart.push(nproduct);
      this.cartSubject$.next(this.currentCart);
    }
    this.addInvoice();
  }

  addInvoice() {
    const invoice = this.initInvoice;
    invoice.total = 0;
    invoice.subtotal = 0;
    invoice.cart = [];
    this.cartSubject$.subscribe((data) => {
      this.currentCart = data;
    });

    this.currentCart.forEach((elemet) => {
      invoice.cart.push(elemet);
      invoice.total += elemet.quantity * elemet.sellingPrice;
    });
    invoice.subtotal = invoice.total;

    console.log('invoice : ', invoice);
    this.invoiceSubject$.next(invoice);
  }

  createAgent(value: FormGroup): Observable<any> {
    const agent: Agent = {
      email: value.value.agentEmail,
      mobile: value.value.agentMobile,
      name: value.value.agentName,
    };

    this.customerInit.agent = agent;
    this.customerInit.mobile = value.value.mobile;
    this.customerInit.name = value.value.name;
    this.customerInit.email = value.value.email;

    this.invoiceSubject$.subscribe((data) => (this.currentInvoice = data));
    this.currentInvoice.customer = this.customerInit;

    return this.http.post<any>(`${PRODUCT_API}/agent`, value.value);
  }
}
