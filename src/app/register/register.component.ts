import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  registerForm: FormGroup;
  isLoading = false;
  onceSubmitted = false;
  registerFailed = false;
  usernameAlreadyTaken = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public register(): void {
    this.onceSubmitted = true;
    this.registerFailed  = false;
    this.usernameAlreadyTaken = false;

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    const username = this.registerForm.controls.username.value;
    const password = this.registerForm.controls.password.value;
    this.authenticationService.register(username, password).subscribe(() => {
      console.log('Successfully registered');
      this.isLoading = false;
      this.router.navigate(['/login']);

    }, err => {
      console.log('REGISTRATION FAILED:', err);
      this.isLoading = false;

      if (err.status === 409) {
        // Username is already taken
        this.usernameAlreadyTaken = true;
      } else {
        this.registerFailed  = true;
      }
    });

  }

}
