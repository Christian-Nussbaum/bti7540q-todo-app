import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Toast, ToastCategory} from '../model/toast';
import {ToastService} from '../toasts/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  isLoading = false;
  onceSubmitted = false;
  loginFailed = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly toastService: ToastService
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
      const toast = new Toast(ToastCategory.Success, 'Login was successfull');
      this.toastService.addToast(toast);
      this.router.navigate(['/todos']);
    }, err => {
      console.log('LOGIN FAILED:', err);
      this.isLoading = false;
      this.loginFailed = true;
      const toast = new Toast(ToastCategory.Error, 'Login failed. (Invalid credentials)');
      this.toastService.addToast(toast);
    });

  }

}
