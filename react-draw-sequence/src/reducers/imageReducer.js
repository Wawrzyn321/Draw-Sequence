import * as actions from "./../actions/action-labels";
import { defaultState } from "./defaultState";

export default function reducers(state = defaultState.image, action) {
  switch (action.type) {
    case actions.ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.image]
      };
    case actions.REMOVE_IMAGES:
        return {
          ...state,
          images: action.images
        };
    case actions.SET_IMAGES:
      return {
        ...state,
        images: action.images
      };
    case actions.SET_IMAGES_COUNT:
        return {
          ...state,
          maxImagesCount: action.maxImagesCount
        };
    case actions.SET_IMAGE_SELECTED:
      const newState = state;
      state.images[action.index].isSelected = action.isSelected;
      return newState;
    default:
      return state;
  }
}
