import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Stock } from 'src/app/models/stock.model';
import { StockStore } from 'src/app/services/stock/stock.store';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit, OnDestroy{
  data:Stock[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private stockStore:StockStore){
  }
  ngOnInit(): void {
    this.getData();
  }
  
  getData(){
    this.stockStore.stocks$.subscribe(data=>{
      this.data = data
      this.dtTrigger.next(data);
    })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
