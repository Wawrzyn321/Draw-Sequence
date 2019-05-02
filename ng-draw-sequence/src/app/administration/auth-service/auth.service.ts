import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of'; // todo wtf importy
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { map, catchError } from 'rxjs/operators';

interface JwtToken { // todo
  accessToken: string;
  accessTokenExpiration: string;
}

const api = 'https://localhost:44307'; // todo

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.httpClient.post(api + '/Auth/Login', formData);
  }

  public setSession(token: JwtToken) { // todo
    localStorage.setItem('id_token', token.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(token.accessTokenExpiration.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('id_token') && moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration == null) {
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
