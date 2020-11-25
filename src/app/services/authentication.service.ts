import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  private token = '';

  public constructor(
    private readonly http: HttpClient
  ) { }

  public isAuthenticated(): boolean {
    return this.token !== '';
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.restApi}/users/login`, undefined, {
      headers: {
        Authorization: this.getAuthHeader(username, password),
      },
      responseType: 'text'
    })
      .pipe(map(jwtToken => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.token = jwtToken;
        return new User(username, '*****');
      }));
  }

  public register(username: string, password: string): Observable<boolean> {
    return this.http.post(`${environment.restApi}/users`, {
      name: username,
      password
    })
    .pipe(map(() => {
      return true;
    }));
  }


  public logout(): void {
    this.token = '';
  }

  private getAuthHeader(username: string, password: string): string {
    return `Basic ${btoa(username + ':' + password)}`;
  }
}
