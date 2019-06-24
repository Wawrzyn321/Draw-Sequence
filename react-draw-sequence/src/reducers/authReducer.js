import * as actions from "./../actions/action-labels";

export default function reducers(state = [], action) {
  switch (action.type) {
    case actions.SET_CREDENTIALS:
      //console.log("red2::log!");
      return state;
    case actions.LOG_OUT:
      //console.log("red2::out!");
      return state;
    default:
      //console.log("red2::def!");
      return state;
  }
}
