import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent implements OnInit {

  constructor(public formBuilder: FormBuilder) { }

  result: any = {};
  className = "justify-content-center";
  visible: boolean = false;
  errorMessage: boolean = false;
  districts: string[] = [];

  states: any[] = [
    {
      name: 'Delhi',
      districts: ['Bhajanpura', 'Khajuri', 'Yamuna Vihar']
    },
    {
      name: 'Uttar Pradesh',
      districts: ['Bhangel', 'Sector 123', 'Sector 456']
    }
  ];

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

  submitted: boolean = false;
  searchForm: FormGroup;

  ifscForm: FormGroup;
  ifscSubmitted: boolean = false;

  ngOnInit(): void {
    this.districts = this.states[0].districts;
    this.searchForm = this.formBuilder.group({
      bank: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      branch: ['', Validators.required]
    });

    this.ifscForm = this.formBuilder.group({
      ifsc: ['', Validators.required]
    });
  }

  onStateChange(name: string) {
    let temp = this.states.filter(state => {
      if (state.name == name) {
        return true;
      }
    });
    this.districts = temp[0].districts;
  }

  get f() { return this.searchForm.controls; }

  get s() { return this.ifscForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    let temp = {
      branchName: this.searchForm.value.branch,
      bank: this.searchForm.value.bank,
      district: this.searchForm.value.district,
      state: this.searchForm.value.state
    };
    console.log(temp);
    let result = this.banks.filter((bank) => {
      if (bank.branchName == temp.branchName && bank.bank == temp.bank && bank.district == temp.district && bank.state == temp.state) {
        return true;
      }
    });
    if (result.length !== 0) {
      this.errorMessage = false;
      this.className = "justify-content-around";
      this.visible = true;
      this.result = result[0];
    }
    else {
      this.errorMessage = true;
      this.visible = false;
    }
  }

  onIFSCSubmit() {
    this.ifscSubmitted = true;
    if (this.ifscForm.invalid) {
      return;
    }
    let result = this.banks.filter((bank) => {
      if (this.ifscForm.value.ifsc == bank.ifsc) {
        return true;
      }
    });
    if (result.length !== 0) {
      this.errorMessage = false;
      this.className = "justify-content-around";
      this.visible = true;
      this.result = result[0];
    }
    else {
      this.errorMessage = true;
      this.visible = false;
    }
  }

}
