import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../administration/auth-service/auth.service';

const api = 'https://localhost:44307'; // todo

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  uploadImage(file, fileRecognitionOptions) {
    const dataModel = new FormData();
    dataModel.append('file', file);

    const params = new HttpParams( { fromObject: fileRecognitionOptions } );
    return this.httpClient.post(api + '/Image/UploadImage?' + params.toString(), dataModel);
  }

  async getImageCount() {
    return await new Promise<number>(resolve =>
      this.httpClient.get(api + '/Image/GetCount')
       .subscribe((count: number) => {
         resolve(count);
       })
      );
  }

  async getImagesBlob(offset: number, limit: number) {
    const data = await fetch(api + `/Image/Get?start=${offset}&end=${limit}`);
    return await data.blob();
  }

  async deleteImages(fromIndex: number) {
    const authHeader = new Headers();
    authHeader.append('Authorization', `Bearer ${this.authService.getToken()}`);
    const configInit: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: authHeader,
        cache: 'no-cache'
    };

    const url = api + '/Image/DeleteImages/?startIndex=' + fromIndex;
    console.log(url);
    const result = await fetch(url, configInit);
    console.log(result);
    return result.status === 200;
  }
}
