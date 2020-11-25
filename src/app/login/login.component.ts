import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  onceSubmitted = false;
  loginFailed = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['test', Validators.required],
      password: ['test', Validators.required]
    });
  }

  public login(): void {
    this.onceSubmitted = true;
    this.loginFailed = false;

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    this.authenticationService.login(username, password).subscribe(() => {
      console.log('Successfully logged in');
      this.isLoading = false;
      this.router.navigate(['/todos']);
    }, err => {
      console.log('LOGIN FAILED:', err);
      this.isLoading = false;
      this.loginFailed = true;
    });

  }

}
