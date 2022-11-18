import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../_models/invoice.model';
import { InvoiceService } from '../../_services/invoice/invoice.service';

@Component({
  selector: 'app-list-approval',
  templateUrl: './list-approval.component.html',
  styleUrls: ['./list-approval.component.css']
})
export class ListApprovalComponent implements OnInit {

  invoices:Invoice[] =[]

  constructor(private invoiceService:InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.invoicesSubject$.subscribe(data=>this.invoices=data);
  }

}
