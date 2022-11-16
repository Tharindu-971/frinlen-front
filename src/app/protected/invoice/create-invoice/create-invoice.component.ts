import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { Invoice } from '../../_models/invoice.model';
import { Product } from '../../_models/product.model';
import { InvoiceService } from '../../_services/invoice/invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];
  search: string = '';

  customerDetails: FormGroup;

  initProducts: Product[] = [];

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
  };

  constructor(
    private invoiceService: InvoiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getCartFromSubject();
    this.getInvoiceFromSubject();
    this.initForm();
  }

  getAllProducts() {
    this.invoiceService.getAllProducts().subscribe((data) => {
      this.invoiceService.productSubject$.next(data);
    });
    // this.getProductFromSubject();
  }

  getProductFromSubject() {
    this.invoiceService.productSubject$.subscribe(
      (data) => (this.products = data)
    );
  }

  initForm() {
    this.customerDetails = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]+'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      }),
      address1: new FormControl(''),
      address2: new FormControl(''),

      agent: new FormGroup({
        name: new FormControl('', [Validators.required]),
        mobile: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]+'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        email: new FormControl('', Validators.required),
      }),
    });
  }

  get name() {
    return this.customerDetails.get('name');
  }
  get mobile() {
    return this.customerDetails.get('mobile');
  }
  get email() {
    return this.customerDetails.get('email');
  }

  get address1() {
    return this.customerDetails.get('address1');
  }
  get address2() {
    return this.customerDetails.get('address2');
  }
  get agentName() {
    return this.customerDetails.get('agent.name');
  }

  get agentEmail() {
    return this.customerDetails.get('agent.email');
  }

  get agentMobile() {
    return this.customerDetails.get('agent.mobile');
  }

  getInvoiceFromSubject() {
    this.invoiceService.invoiceSubject$.subscribe(
      (data) => (this.initInvoice = data)
    );
  }

  getCartFromSubject() {
    console.log('cart', this.cart[0]);
    this.invoiceService.cartSubject$.subscribe((data) => (this.cart = data));
  }

  searchProduct(value: string) {
    if (value) {
      this.invoiceService.productSubject$
        .pipe(
          map((data) => {
            const res = data.filter(
              (x) =>
                x.name
                  .toLocaleLowerCase()
                  .startsWith(value.toLocaleLowerCase()) && x.inStock
            );
            console.log('serahf', res);
            this.products = data;
            return res;
          })
        )
        .subscribe((data) => (this.products = data));
    } else {
      this.products = [];
    }
  }

  addToCart(product: Product) {
    this.invoiceService.addProduct(product, 1, 0);
    this.invoiceService.cartSubject$.subscribe((data) => (this.cart = data));
    console.log(product);
    this.products = [];
    console.log('cattt', this.cart[0]);
  }
  addAmountToCart(product: Product, quantity: string) {
    const qty = Number(quantity);
    this.invoiceService.addProduct(product, qty, 1);
    this.invoiceService.cartSubject$.subscribe((data) => (this.cart = data));
    console.log(product);
    this.products = [];
    console.log('cattt', this.cart[0]);
  }

  remove(id: number) {
    this.invoiceService.removeProduct(id);
  }

  addTax(initInvoice, value: string) {}

  onSubmit() {
    console.log('form value  : ', this.customerDetails.value);
  }
}
