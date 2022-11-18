import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  showAgent: boolean = false;
  search: string = '';
  isCash: boolean = false;
  isCredit: boolean = false;
  isCheque: boolean = false;
  customerDetails: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  initForm() {
    this.customerDetails = this.fb.group({
      id: new FormControl(0),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]+'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      }),
      address1: new FormControl(''),
      address2: new FormControl(''),
      isStandAlone: new FormControl(true),

      agentName: new FormControl('', [Validators.required]),
      agentMobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      agentEmail: new FormControl('', [Validators.required, Validators.email]),
      paymentMethod: new FormControl(''),
      chequeNumber: new FormControl(0),
      paymentAmount: new FormControl(0, Validators.pattern('^[0-9]+')),
      balance: new FormControl(0),
    });
    this.customerDetails.valueChanges.subscribe((data) => {
      data.isStandAlone ? (this.showAgent = false) : (this.showAgent = true);
      if (data.paymentMethod == 'cash') {
        this.isCash = true;
        this.isCredit = false;
        this.isCheque = false;
      } else if (data.paymentMethod == 'credit') {
        this.isCash = false;
        this.isCredit = true;
        this.isCheque = false;
      } else if (data.paymentMethod == 'cheque') {
        this.isCheque = true;
        this.isCash = false;
        this.isCredit = false;
      }

      // console.log('customers: ', this.customers);
      // console.log('data', data.mobile.va);
      // const customer = this.customers.find((x) =>
      //   x.mobile.includes(data.mobile.value)
      // );
      // console.log('ggggg', customer);
      // if (customer) {
      //   this.setFormData(customer);
      // } else {
      //   this.customerDetails.patchValue({
      //     id: 0,
      //     name: '',
      //     email: '',
      //     address1: '',
      //     address2: '',
      //     agentName: '',
      //     agentMobile: '',
      //     agentEmail: '',
      //   });
      // }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerDetails.controls;
  }
}
