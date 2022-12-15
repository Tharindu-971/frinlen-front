import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerStore } from 'src/app/services/customer/customer.store';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerForm:FormGroup;

  constructor(private fb:FormBuilder,private customerStore:CustomerStore){

  }
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name:['',[Validators.required]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+')]],
      email:['',[Validators.email]],
      vatNo:[''],
      address1:['',[Validators.required]],
      address2:[''],
      isActive:[true]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  onSubmit(form:FormGroup){
    if(this.customerForm.valid){
      this.customerStore.createCustomer(form.value).subscribe(()=>this.customerForm.reset());
    }
  }
  cancel(){
    this.customerForm.reset();
  }

}
