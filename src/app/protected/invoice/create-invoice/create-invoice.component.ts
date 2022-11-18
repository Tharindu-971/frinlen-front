import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectableObservable, map } from 'rxjs';
import { Customer } from '../../_models/customer.model';
import { Invoice } from '../../_models/invoice.model';
import { Product } from '../../_models/product.model';
import { CustomerService } from '../../_services/customer/customer.service';
import { InvoiceService } from '../../_services/invoice/invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];
  customers: Customer[] = [];
  searchCustomers: Customer[] = [];
  showAgent: boolean = false;
  search: string = '';
  isCash: boolean = false;
  isCredit: boolean = false;
  isCheque: boolean = false;

  customerDetails: FormGroup;

  initProducts: Product[] = [];
  initCustomer: Customer = {
    name: '',
    email: '',
    mobile: '',
    address1: '',
  };

  initInvoice: Invoice = {
    total: 0,
    subtotal: 0,
    number: 0,
    tax: 0,
    discount: 0,
    isApproved: false,
    approvedBy: '',
    taxAmount: 0,
    discountAmount: 0,
    isActive: true,
    reason: '',
    cart: this.initProducts,
    customer: this.initCustomer,
  };

  constructor(
    private invoiceService: InvoiceService,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCustomers();
    this.getCartFromSubject();
    this.getInvoiceFromSubject();
    this.getCustomersFromSubject();
    this.initForm();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerDetails.controls;
  }

  getAllProducts() {
    this.invoiceService.getAllProducts().subscribe((data) => {
      this.invoiceService.productSubject$.next(data);
    });

    // this.getProductFromSubject();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe((data) => {
      this.invoiceService.customerSubject$.next(data);
    });
  }

  getProductFromSubject() {
    this.invoiceService.productSubject$.subscribe(
      (data) => (this.products = data)
    );
  }
  getCustomersFromSubject() {
    this.invoiceService.customerSubject$.subscribe(
      (data) => (this.customers = data)
    );
  }

  initForm() {
    console.log(this.customers);
    this.customerDetails = this.fb.group({
      id: new FormControl(0),
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
      isStandAlone: new FormControl(true),

      agentName: new FormControl('', [Validators.required]),
      agentMobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      agentEmail: new FormControl('', [Validators.required, Validators.email]),
      paymentMethod: new FormControl(''),
      chequeNumber: new FormControl(0),
      paymentAmount: new FormControl(0, Validators.pattern('^[0-9]+')),
      balance: new FormControl(0),
    });
    this.customerDetails.valueChanges.subscribe((data) => {
      data.isStandAlone ? (this.showAgent = false) : (this.showAgent = true);
      if (data.paymentMethod == 'cash') {
        this.isCash = true;
        this.isCredit = false;
        this.isCheque = false;
      } else if (data.paymentMethod == 'credit') {
        this.isCash = false;
        this.isCredit = true;
        this.isCheque = false;
      } else if (data.paymentMethod == 'cheque') {
        this.isCheque = true;
        this.isCash = false;
        this.isCredit = false;
      }

      // console.log('customers: ', this.customers);
      // console.log('data', data.mobile.va);
      // const customer = this.customers.find((x) =>
      //   x.mobile.includes(data.mobile.value)
      // );
      // console.log('ggggg', customer);
      // if (customer) {
      //   this.setFormData(customer);
      // } else {
      //   this.customerDetails.patchValue({
      //     id: 0,
      //     name: '',
      //     email: '',
      //     address1: '',
      //     address2: '',
      //     agentName: '',
      //     agentMobile: '',
      //     agentEmail: '',
      //   });
      // }
    });
  }

  setFormData(customer: Customer) {
    console.log('form changes :', customer);
    this.customerDetails.patchValue({
      id: customer.id,
      mobile: customer.mobile,
      name: customer.name,
      email: customer.email,
      address1: customer.address1,
      address2: customer.address2,
      agentName: customer.agent?.name,
      agentMobile: customer.agent?.mobile,
      agentEmail: customer.agent?.email,
    });

    this.searchCustomers = [];
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
  searchCustomer(value: string) {
    if (value) {
      this.invoiceService.customerSubject$
        .pipe(
          map((data) => {
            const res = data.filter((x) =>
              x.mobile.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            );
            console.log('serahf', res);
            const customer = data;
            return res;
          })
        )
        .subscribe((data) => (this.searchCustomers = data));
    } else {
      this.searchCustomers = [];
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

  addTax(initInvoice: Invoice, value: string) {
    this.invoiceService.addTax(initInvoice, Number(value));
  }
  addDiscount(initInvoice: Invoice, value: string) {
    this.invoiceService.addDiscount(initInvoice, Number(value));
  }

  onSubmit() {
    console.log('heelo');
    console.log('form value  : ', this.customerDetails.value);

    // if (this.customerDetails.value.id == 0) {
    //   this.invoiceService
    //     .createAgent(this.customerDetails)
    //     .subscribe((data) => console.log(data));
    // }
    this.router.navigate(['/protected/invoice/view']);
  }
}
