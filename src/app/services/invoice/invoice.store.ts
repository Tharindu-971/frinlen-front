import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { Agent } from "src/app/models/agent.model";
import { Customer } from "src/app/models/customer.model";
import { InvoiceQty } from "src/app/models/invoice-qty.model";
import { Invoice } from "src/app/models/invoice.model";
import { Stock } from "src/app/models/stock.model";
import { environment } from "src/environments/environment";
import { LoadingService } from "../loading/loading.service";

@Injectable({
    providedIn:'root'
})
export class InvoiceStore{


    private subject= new BehaviorSubject<Invoice[]>([])
    private invoiceSubject= new BehaviorSubject<Invoice>(null)
    

    invoices$:Observable<Invoice[]> = this.subject.asObservable();
    invoice$:Observable<Invoice> = this.invoiceSubject.asObservable();

    constructor(private http:HttpClient,private toastr:ToastrService,private loadingService:LoadingService){
        this.loadInvoices();
    }

    private loadInvoices() {
        const loadInvoices$ = this.http.get<Invoice[]>(`${environment.apiUrl}/invoices`)
          .pipe(
            map(response => {console.log("ffffffffffff",response);return response}),
            catchError(err => {
              const message = "Could not load invoices";
              this.toastr.error(message);
              console.log("InvoiceStore:loadInvoices", err)
              return throwError(err)
            }),
            tap(invoices => this.subject.next(invoices))
          )
    
        this.loadingService.showLoaderUntillCompleted(loadInvoices$).subscribe();
      }
    
      createInvoice(invoice:Invoice):Observable<any>{
        const invoices = this.subject.getValue();
        // invoices.push(invoice);
        // this.subject.next(invoices);
        const sava$= this.http.post<any>(`${environment.apiUrl}/invoices`,invoice)
          .pipe(
            map(response=>{
              console.log("res",response)
              if(response){
                  this.toastr.success("Invoice Created Successfully")
                }else{
                  this.toastr.warning("Could not Create Invoice")
                }
              }
            ),
            catchError(err=>{
              this.toastr.error("Could not Create Invoice");
              console.log("InvoiceStore:createInvoice",err)
              return throwError(err)
            })
          )

          this.loadInvoices();
          
          return sava$;
      }
    
      updateInvoice(id:number,invoice:Partial<Invoice>):Observable<any>{
        const invoices = this.subject.getValue();
        const index = invoices.findIndex(invoice=>invoice.id == id);
    
        const newInvoice:Invoice ={
          ...invoices[index],
          ...invoice
        } 
        const newInvoices : Invoice[]=invoices.slice(0);
        newInvoices[index] = newInvoice;
        this.subject.next(newInvoices);
    
        return this.http.put<any>(`${environment.apiUrl}/invoices/${id}`,invoice)
        .pipe(
          map(response =>{
            
            if(response){
                this.toastr.success("Invoice Created Successfully")
              }else{
                this.toastr.warning("Could not Create Invoice")
              }
          }),
          catchError(err=>{
            this.toastr.error("Could not Update Invoice");
            console.log("InvoiceStore:stockUpdate",err)
            return throwError(err)
          })
        )
      }
    
      deleteInvoice(id:number):Observable<any>{
        const invoices = this.subject.getValue();
        const updatedInvoices:Invoice[] = invoices.filter(invoice=>invoice.id != id);
    
        this.subject.next(updatedInvoices);
    
        return this.http.delete<any>(`${environment.apiUrl}/invoices/${id}`)
        .pipe(
          map(response =>{
            if(response){
              this.toastr.success("Invoice Deleted Successfully")
            }else{
              this.toastr.warning("Could not Delete Invoice")
            }
          }),
          catchError(err=>{
            this.toastr.error("Could not Delete Invoice");
            console.log("InvoiceStore:deleteStock",err)
            return throwError(err)
          })
        )
      }

      getSequenceId():Observable<any>{
        const loadSequenceId$ = this.http.get<any>(`${environment.apiUrl}/invoices/sequence`)
          .pipe(
            map(response => response),
            catchError(err => {
              const message = "Could not load invoices";
              this.toastr.error(message);
              console.log("InvoiceStore:loadSequenceId", err)
              return throwError(err)
            }),
          )
    
        return this.loadingService.showLoaderUntillCompleted(loadSequenceId$);
      }

      getInvoiceById(id:number){
        const invoices = this.subject.getValue();
        const invoice = invoices.find(invoice => invoice.id==id)
        
        if(invoice){
          this.invoiceSubject.next(invoice)
        }else{
          this.http.get<any>(`${environment.apiUrl}/invoices/${id}`)
          .pipe(
            map(response => {
              if(response){
                this.invoiceSubject.next(response)
              }
            }),
            catchError(err => {
              const message = "Could not load invoice with id :"+id;
              this.toastr.error(message);
              console.log("InvoiceStore:loadSequenceId", err)
              return throwError(err)
            }),
          ).subscribe();
        }

        
    
        
       
      }

      addApprovedAmount(invoId:number,qtyId:number,value:number){
        const invoices = this.subject.getValue();
        const invoice = invoices.find(invoice => invoice.id==invoId)
        if(invoice){
          const invoiceQty =invoice.invoiceQuantities.find(qty =>qty.id == qtyId)
          if(invoiceQty){
            invoiceQty.approvedQuantity = Number(value);
            this.invoiceSubject.next(invoice)

            const index = invoices.findIndex(invoice => invoice.id == invoId);

            const newInvoice: Invoice = invoices[index]
            const newInvoices: Invoice[] = invoices.slice(0);
            newInvoices[index] = newInvoice;
            this.subject.next(newInvoices)
          }
        }
        console.log(invoice)
      }

      addReason(id: number, invoice: Invoice){
        const invoices = this.subject.getValue();
        const index = invoices.findIndex(invoice=>invoice.id == id);
    
        const newInvoice:Invoice ={
          ...invoices[index],
          ...invoice
        } 
        const newInvoices : Invoice[]=invoices.slice(0);
        newInvoices[index] = newInvoice;
        this.subject.next(newInvoices);
      }
      
      approveInvoice(id:number,invoice:Invoice):Observable<any>{
        const invoices = this.subject.getValue();
        const index = invoices.findIndex(invoice=>invoice.id == id);
        console.log("store"+invoice)
        const newInvoice:Invoice = this.calTotal(invoice,invoice.invoiceQuantities) 
        // const newInvoice:Invoice ={
        //   ...invoices[index],
        //   ...invoice
        // } 
        const newInvoices : Invoice[]=invoices.slice(0);
        newInvoices[index] = newInvoice;
        this.subject.next(newInvoices);

        return this.http.post<any>(`${environment.apiUrl}/invoices/approve/${id}`,invoice)
        .pipe(
          map(response =>{
            
            if(response){
              console.log("res drews :",response)
              if(response.approved){
                this.toastr.success("Invoice Approved Successfully")
              }else{
                this.toastr.warning("Invoice Rejected Successfully")
              }
                
              }else{
                this.toastr.warning("Could not Approve Invoice")
              }
          }),
          catchError(err=>{
            this.toastr.error("Could not Approve Invoice");
            console.log("InvoiceStore:stockUpdate",err)
            return throwError(err)
          })
        )
      }


      private calTotal(invoice:Invoice,stocks:InvoiceQty[]){
        // const invoice = this.invoiceSubject.getValue();
        invoice.total=0;
        invoice.subTotal=0;
        invoice.totalLiters =0;

        for(let i = 0 ;i<stocks.length;i++){
            invoice.subTotal += Math.round((stocks[i].inventory.sellingPrice*stocks[i].inventory.approvedQty) * 100) / 100;
            invoice.totalLiters += Math.round((stocks[i].inventory.unitLiters*stocks[i].inventory.approvedQty) * 100) / 100;
        }
        
        invoice.tax =Math.round((invoice.subTotal*0.15 ) * 100) / 100; 
        invoice.total = Math.round((invoice.subTotal+invoice.tax) * 100) / 100;
        //this.invoiceSubject.next(invoice);
        return invoice;
    }
}