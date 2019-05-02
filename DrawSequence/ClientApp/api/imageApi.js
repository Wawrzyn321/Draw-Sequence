const encodeParams = params =>
  Object.entries(params)
    .map(map => map.map(encodeURIComponent).join("="))
    .join("&");

export default {
  async getImageCount() {
    const data = await fetch("/Image/GetCount");
    return await data.json();
  },

  async getImagesBlob(start, end) {
    const data = await fetch(`/Image/Get?start=${start}&end=${end}`);
    return await data.blob();
  },

  async uploadImage(dataModel, params) {
    const data = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: dataModel
    };
    let input = "/Image/UploadImage/";
    if (params) {
      input += "?" + encodeParams(params);
    }
    const result = await fetch(input, data);
    return await result.json();
  },

  async deleteImages(startIndex, accessToken) {
    const bearer = "Bearer " + accessToken;
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
    let input = "/Image/DeleteImages/?startIndex=" + startIndex;
    const result = await fetch(input, data);
    return result.status === 200;
  }
};
