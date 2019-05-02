export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export default {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, respJson) => {
    state.status = "success";
    state.token = respJson.accessToken;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_FAILURE]: state => {
    state.status = "failure";
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
  }
};
