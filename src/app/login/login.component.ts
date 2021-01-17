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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    this.onceSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    this.authenticationService.login(username, password).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['/todos']);
      const toast = new Toast(ToastCategory.Success, 'Login was successfull');
      this.toastService.addToast(toast);
    }, err => {
      this.isLoading = false;
      const toast = new Toast(ToastCategory.Error, 'Login request failed.');
      this.toastService.addToast(toast);
    });

  }

}
