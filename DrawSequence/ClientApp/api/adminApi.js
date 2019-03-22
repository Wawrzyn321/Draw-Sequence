import "babel-polyfill";
import "isomorphic-fetch";

export default {
  async logIn(loginData) {
    const data = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: loginData
    };
    const response = await window.fetch("/Auth/Login", data);
    if (response.status === 200) {
      return response.json();
    } else {
      return null;
    }
  },

  async logOut() {
    const response = await window.fetch("/Auth/Logout");
    return response.status;
  }
};
