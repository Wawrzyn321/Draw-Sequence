import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const api = 'https://localhost:44307'; // todo
@Injectable({
  providedIn: 'root'
})
export class EntryManagementService {

  constructor(private httpClient: HttpClient) { }

  call() {
    const idToken = localStorage.getItem('id_token');
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + idToken);

    return this.httpClient.post(api + '/Image/DeleteImages?startIndex = 10', {}, { headers });
  }

}

