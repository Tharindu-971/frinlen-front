import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerStore } from 'src/app/services/customer/customer.store';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit,OnDestroy{
  data:Customer[]=[]
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  ngOnInit(): void {
    this.getData();
  }
  
  

  constructor(private customerStore:CustomerStore){}

  getData(){
    this.customerStore.customers$.subscribe(data=>{
      this.data = data
      console.log(this.data)
      this.dtTrigger.next(data);
    })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
