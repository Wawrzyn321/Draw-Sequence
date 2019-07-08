import { apiConfig } from './apiConfig';
import { logIn, logout } from './../actions/authActions';

export default class AuthService {

    static isLoggedIn() {
        return !!AuthService.getAccessToken();
    }

    static getAccessToken() {
        return localStorage.getItem("react-draw-sequence-token");
    }

    static async tryLogIn(loginData) {
    const data = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: loginData
    };
    const url = apiConfig.mainUrl + apiConfig.auth + "/Login";
    const response = await window.fetch(url, data);
    if (response.status === 200) {
      return response.json();
    } else {
      return null;
    }
  }

  static setCredentials(credentials, dispatch) {
    localStorage.setItem("react-draw-sequence-token", credentials.accessToken);
    localStorage.setItem("react-draw-sequence-token-expire", credentials.accessTokenExpiration);
    dispatch(logIn(credentials));
  }

  static logOut(dispatch) {
    localStorage.removeItem("react-draw-sequence-token");
    localStorage.removeItem("react-draw-sequence-token-expire");
    dispatch(logout());
  }
};
