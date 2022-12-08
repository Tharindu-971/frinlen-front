import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { AuthStore } from 'src/app/services/auth/auth.store';
import { InvoiceStore } from 'src/app/services/invoice/invoice.store';

@Component({
  selector: 'app-invoice-approve',
  templateUrl: './invoice-approve.component.html',
  styleUrls: ['./invoice-approve.component.css']
})
export class InvoiceApproveComponent implements OnInit{

  invoice$:Observable<Invoice>;
  userId:number;

  constructor(private invoiceStore:InvoiceStore,
    private route:ActivatedRoute,
    private authStore:AuthStore){}

  ngOnInit(): void {
    
    this.invoiceStore.getInvoiceById(Number(this.route.snapshot.paramMap.get('id')));
    this.invoice$ = this.invoiceStore.invoice$;

    this.authStore.user$.subscribe(data => this.userId=data.id)

  }

  addApprovedAmount(invoId:number,qtyId:number,amount:string){
    this.invoiceStore.addApprovedAmount(invoId,qtyId,Number(amount))
  }
  submit(invoice:Invoice){
    invoice.approvedBy = this.userId;
    this.invoiceStore.approveInvoice(invoice.id,invoice).subscribe();
  }




}
