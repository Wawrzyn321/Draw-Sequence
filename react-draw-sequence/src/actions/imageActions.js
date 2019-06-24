import { ADD_IMAGE, REMOVE_IMAGES, LOAD_IMAGES } from './action-labels';

export function addImage(imageId, imageUrl) {
    return {
        type: ADD_IMAGE,
        imageId,
        imageUrl,
        isSelected: false
    }
}

export function removeImages(fromIndex) {
    return {
        type: REMOVE_IMAGES,
        fromIndex
    }
}

export function loadImages(start, offset) {
    return {
        type: LOAD_IMAGES,
        start,
        offset
    }
}
