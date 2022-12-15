import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router : Router,
    private authStore:AuthStore){}

  ngOnInit(): void {
    
    this.invoiceStore.getInvoiceById(Number(this.route.snapshot.paramMap.get('id')));
    this.invoice$ = this.invoiceStore.invoice$;

    this.authStore.user$.subscribe(data => this.userId=data.id)

  }

  addApprovedAmount(invoId:number,qtyId:number,amount:string){
    this.invoiceStore.addApprovedAmount(invoId,qtyId,Number(amount))
  }

  addReason(value:string,invoice:Invoice){
    invoice.reason =value; 
    
    console.log("reason :",invoice)
    this.invoiceStore.addReason(invoice.id,invoice);
  }
  submit(invoice:Invoice){
    invoice.approvedBy = this.userId;
    invoice.isApproved = true;
    console.log("approved :",invoice )
    this.invoiceStore.approveInvoice(invoice.id,invoice).subscribe();
    this.router.navigate(['/protected/invoices'])
  }

  reject(invoice:Invoice){
    invoice.approvedBy = this.userId;
    invoice.isApproved = false;
    console.log("reject :",invoice )
    this.invoiceStore.approveInvoice(invoice.id,invoice).subscribe();
    this.router.navigate(['/protected/invoices'])
  }




}
