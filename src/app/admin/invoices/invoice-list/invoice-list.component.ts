import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { User } from 'src/app/models/user.model';
import { AuthStore } from 'src/app/services/auth/auth.store';
import { InvoiceStore } from 'src/app/services/invoice/invoice.store';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit{
  user$:Observable<User>;
  invoices$:Observable<Invoice[]>;
    constructor(private invoiceStore:InvoiceStore,private authStore:AuthStore){}

    ngOnInit(): void {
      this.invoices$ = this.invoiceStore.invoices$
      this.user$ = this.authStore.user$;
    }
}
