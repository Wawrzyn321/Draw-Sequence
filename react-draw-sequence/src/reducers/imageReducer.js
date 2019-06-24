import * as actions from "./../actions/action-labels";

export default function reducers(state = [], action) {
  switch (action.type) {
    case actions.ADD_IMAGE:
      //console.log("red::add!");
      return state;
    case actions.LOAD_IMAGES:
      //console.log("red::load!");
      return state;
    case actions.REMOVE_IMAGES:
     // console.log("red::rem!");
      return state;
    default:
      //console.log("red::def!");
      return state;
  }
}
