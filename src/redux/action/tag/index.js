import * as types from "../actionTypes"

export const fetchTags = (tags) => ({ type: types.FECTH_TAGS, tags: tags });
export const filterByTag = (tagName) => ({ type: types.FILTER_BY_TAG, tagName: tagName });