import * as actions from "./../actions/action-labels";
import { defaultState } from "./defaultState";

export default function reducers(state = defaultState.auth, action) {
  switch (action.type) {
    case actions.SET_CREDENTIALS:
      return {
        ...state,
        isLoggedIn: true,
        access_token: action.access_token,
        token_expire: action.token_expire
      };
    case actions.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        access_token: null,
        token_expire: null
      }
    default:
      return state;
  }
}
