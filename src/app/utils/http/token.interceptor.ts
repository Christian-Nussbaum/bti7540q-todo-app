import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';

/**
 * This service intercepts every HttpRequest and if the user is already registered,
 * it adds the Authorization header onto the HttpRequest before it gets sent.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  public constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  // tslint:disable-next-line:no-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.authenticationService.isAuthenticated()) {
      const token = this.authenticationService.getToken();

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Since HttpHeader class does only set the headers (key-value) pairs if they are required.
      // We need to query them, in order to provoke their presence.
      // --> Simply setting the header, will only load them in the objects lazyInit OR lazyUpdate method.
      // Further information can be found here:
      // https://indepth.dev/exploring-the-httpclientmodule-in-angular#what-s-the-magic-behind-httpheaders
      request.headers.get('Authorization');
    }

    return next.handle(request);
  }

}
