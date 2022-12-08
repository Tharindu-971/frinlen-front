import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockStore } from 'src/app/services/stock/stock.store';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit{
  
  stockForm:FormGroup;
  dissable:boolean = true;

  constructor(private fb:FormBuilder,private stockStore:StockStore){}
  
  ngOnInit(): void {
    this.stockForm = this.fb.group({
      name:['',[Validators.required]],
      buyingPrice:[0,[Validators.required]],
      sellingPrice:[0,[Validators.required]],
      quantity:[0,[Validators.required]],
      reOrderLevel:[0],
      inStock:[true],
      status:['INSTOCK'],
      isActive:[true],
      unitLiters:[0,[Validators.required]],
      liters:[0]
    })

    //this.stockForm.controls['liters'].disable();
    this.stockForm.get('unitLiters').valueChanges.subscribe(val=>{
      const qty = Math.round((Number(this.stockForm.get('quantity').value) + Number.EPSILON) * 100) / 100 ;
      this.stockForm.get('liters').patchValue(Math.round(((val*qty) + Number.EPSILON) * 100) / 100)
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.stockForm.controls;
  }

  

  onSubmit(form:FormGroup){
    if(this.stockForm.valid){
      console.log("llliter",form.value)
      this.stockStore.createStock(form.value).subscribe(()=>this.stockForm.reset())
    }
  }

  cancel(){
    this.stockForm.reset();
  }

}
