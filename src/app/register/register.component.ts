import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastCategory } from '../model/toast';
import { AuthenticationService } from '../services/authentication.service';
import { ToastService } from '../toasts/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  registerForm: FormGroup;
  isLoading = false;
  onceSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public register(): void {
    this.onceSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    const username = this.registerForm.controls.username.value;
    const password = this.registerForm.controls.password.value;
    this.authenticationService.register(username, password).subscribe(() => {
      let msg: string = 'Successfully registered';
      console.log(msg);
      this.isLoading = false;
      this.router.navigate(['/login']);
      const toast = new Toast(ToastCategory.Success, msg);
      this.toastService.addToast(toast);

    }, err => {
      console.log('REGISTRATION FAILED:', err);
      this.isLoading = false;

      if (err.status === 409) {
        // Username is already taken
        const toast = new Toast(ToastCategory.Error, 'Registration failed, because the username is already taken.');
        this.toastService.addToast(toast);
      } else {
        const toast = new Toast(ToastCategory.Error, 'Registration request failed.');
        this.toastService.addToast(toast);
      }
    });

  }

}
