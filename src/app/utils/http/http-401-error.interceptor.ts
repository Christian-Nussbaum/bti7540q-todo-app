import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

/**
 * This service treats any http response with HttpStatusCode 401
 * It verifies that the token gets deleted and that the user is redirected to the login page.
 */
@Injectable()
export class Http401ErrorInterceptor implements HttpInterceptor {

  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  // tslint:disable-next-line:no-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.info('Token expired. User will be redirected to login page.');
          // Verify token gets destroyed
          this.authenticationService.logout();

          this.router.navigate(['login']);
          const customError = 'Token expired. User will be redirected to login page.';
          return error;
        }

        return throwError(error);
    }));
  }

}
