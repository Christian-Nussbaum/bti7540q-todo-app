import { Component } from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,

  ) {
  }

  public get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
