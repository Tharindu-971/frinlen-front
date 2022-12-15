import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceStore } from 'src/app/services/invoice/invoice.store';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css']
})
export class InvoicePrintComponent implements OnInit{

  invoice$:Observable<Invoice>;
  myDate = new Date();
  datePipe: any;

  constructor(private invoiceStore:InvoiceStore,private route:ActivatedRoute){
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    
    this.invoiceStore.getInvoiceById(Number(this.route.snapshot.paramMap.get('id')));
    this.invoice$ = this.invoiceStore.invoice$;
  }
}
