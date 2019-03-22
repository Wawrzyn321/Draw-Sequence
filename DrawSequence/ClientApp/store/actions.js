import adminApi from "../api/adminApi";
import {
  AUTH_REQUEST,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_ERROR
} from "./mutations";
import "babel-polyfill";

export default {
  [AUTH_REQUEST]: async ({ commit }, user) => {
    commit(AUTH_REQUEST);
    try {
      const loginResult = await adminApi.logIn(user);
      if (loginResult) {
        commit(AUTH_SUCCESS, loginResult);
      } else {
        commit(AUTH_FAILURE);
      }
    } catch (err) {
      commit(AUTH_ERROR, err);
      console.warn(err);
    }
  },
  [AUTH_LOGOUT]: async ({ commit }) => {
    try {
      await adminApi.logOut();
      commit(AUTH_LOGOUT);
    } catch (err) {
      console.warn(err);
    }
  }
};
