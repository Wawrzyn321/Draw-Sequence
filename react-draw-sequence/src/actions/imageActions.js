import { ADD_IMAGE, REMOVE_IMAGES, LOAD_IMAGES, SET_IMAGES, SET_IMAGES_COUNT, SET_IMAGE_SELECTED } from './action-labels';

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

export function setImages(images) {
    return {
        type: SET_IMAGES,
        images
    }
}

export function setMaxImagesCount(maxImagesCount) {
    return {
        type: SET_IMAGES_COUNT,
        maxImagesCount
    }
}

export function setImageSelectionState(index, isSelected) {
    return {
        type: SET_IMAGE_SELECTED,
        index,
        isSelected
    }
}
