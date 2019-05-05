import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { API_CONFIG, ApiConfig } from 'src/app/core/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, @Inject(API_CONFIG) private config: ApiConfig) { }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const url = this.config.mainUrl + this.config.auth + '/Login';
    return this.httpClient.post(url, formData);
  }

  public setSession(token: JwtToken) {
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

  getToken() {
    return localStorage.getItem('id_token');
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
