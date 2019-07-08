import { apiConfig } from './apiConfig';
import AuthService from './auth';

export class ImageService {

  async getImageCount() {
    const url = apiConfig.mainUrl + apiConfig.image + "/GetCount";
    const res = await fetch(url);
    return await res.json();
  }

  async getImagesBlob(offset, limit) {
    const url = `${apiConfig.mainUrl}${apiConfig.image}/Get?start=${offset}&end=${limit}`;
    const data = await fetch(url);
    return await data.blob();
  }

  async uploadImage(dataModel, params) {
    const data = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: dataModel
    };
    let url = `${apiConfig.mainUrl}${
      apiConfig.image
    }/UploadImage/`;
    if (params) {
      url += "?" + this.encodeParams(params);
    }
    const result = await fetch(url, data);
    return await result.json();
  }

  async deleteImages(startIndex) {
    const bearer = "Bearer " + AuthService.getAccessToken();
    const data = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: bearer
      }
    };
    const url = `${apiConfig.mainUrl}${
      apiConfig.image
    }/DeleteImages/?startIndex=${startIndex}`;
    const result = await fetch(url, data);
    return result.status === 200;
  }

  encodeParams(params) {
    return Object.entries(params)
      .map(map => map.map(encodeURIComponent).join("="))
      .join("&");
  }
}
