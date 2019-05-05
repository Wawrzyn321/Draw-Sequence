import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../administration/auth-service/auth.service';
import { API_CONFIG, ApiConfig } from '../apiConfig';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient, private authService: AuthService, @Inject(API_CONFIG) private config: ApiConfig) { }

  uploadImage(file, fileRecognitionOptions) {
    const dataModel = new FormData();
    dataModel.append('file', file);

    const params = new HttpParams( { fromObject: fileRecognitionOptions } );

    const url = `${this.config.mainUrl}${this.config.image}/UploadImage?${params.toString()}`;

    return this.httpClient.post(url, dataModel);
  }

  async getImageCount() {
    const url = this.config.mainUrl + this.config.image + '/GetCount';

    return await new Promise<number>(resolve =>
      this.httpClient.get(url)
       .subscribe((count: number) => {
         resolve(count);
       })
      );
  }

  async getImagesBlob(offset: number, limit: number) {
    const url = `${this.config.mainUrl}${this.config.image}/Get?start=${offset}&end=${limit}`;
    const data = await fetch(url);
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

    const url = `${this.config.mainUrl}${this.config.image}/DeleteImages/?startIndex=${fromIndex}`;
    const result = await fetch(url, configInit);
    return result.status === 200;
  }
}
