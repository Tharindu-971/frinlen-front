import { Component, OnInit } from '@angular/core';
import { Customer } from '../../_models/customer.model';
import { Invoice } from '../../_models/invoice.model';
import { Product } from '../../_models/product.model';
import { InvoiceService } from '../../_services/invoice/invoice.service';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.css'],
})
export class DetailInvoiceComponent implements OnInit {
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

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.invoiceSubject$.subscribe(
      (data) => (this.initInvoice = data)
    );
  }
}
