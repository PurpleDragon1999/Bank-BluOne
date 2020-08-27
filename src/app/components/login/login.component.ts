import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public router: Router) { }

  users: any[] = [
    {
      email: 'ss320163@gmail.com',
      name: 'Shubham Sharma',
      password: 'shubhamsharma'
    },
    {
      email: 'saurabh-thukral@gmail.com',
      name: 'Saurabh Thukral',
      password: 'saurabhthukral'
    }
  ];
  errorMessage: boolean = false;
  login: boolean = false;
  submitted: boolean = false;
  loginForm: FormGroup;

  ngOnInit(): void {
    if (localStorage.getItem('login') == 'true') {
      this.router.navigate(['bank-list']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.users.map(user => {
      if (user.email === this.loginForm.value.email && user.password === this.loginForm.value.password) {
        this.login = true;
        localStorage.setItem('login', 'true');
        localStorage.setItem('name', user.name);
        this.router.navigate(['/bank-list']);
      }
    });
    if (!this.login) {
      this.errorMessage = true;
    }
  }

}
