import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public router: Router) { }

  name: string = "";
  bankForm: FormGroup;
  addBranch: boolean = false;
  submitted: boolean = false;
  buttonText: string = "Add Bank";

  banks: any[] = [
    {
      branchName: 'Kotak, Noida',
      ifsc: 'KC34',
      bank: 'Kotak Mahindra Bank',
      district: 'Bhangel',
      state: 'Uttar Pradesh'
    },
    {
      branchName: 'BOB, Noida',
      ifsc: 'BARB0BHADEL',
      bank: 'Bank Of Baroda',
      district: 'Bhajanpura',
      state: 'Delhi'
    }
  ];

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.bankForm = this.formBuilder.group({
      state: ['', Validators.required],
      district: ['', Validators.required],
      branch: ['', Validators.required],
      bank: ['', Validators.required],
      ifsc: ['', Validators.required]
    })
  }

  get f() { return this.bankForm.controls; }

  openForm() {
    if (this.buttonText == "Add Bank") {
      this.addBranch = true;
      this.buttonText = "Close Form"
    }
    else {
      this.addBranch = false;
      this.buttonText = "Add Bank";
    }

  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  delete(ifsc: string) {
    this.banks = this.banks.filter((bank) => {
      return bank.ifsc !== ifsc;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.bankForm.invalid) {
      return;
    }
    let temp = {
      branchName: this.bankForm.value.branch,
      ifsc: this.bankForm.value.ifsc,
      bank: this.bankForm.value.bank,
      district: this.bankForm.value.district,
      state: this.bankForm.value.state
    }
    this.banks.push(temp);

    this.addBranch = false;
    this.buttonText = "Add Bank";
  }
}

