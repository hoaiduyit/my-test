import { FECTH_TAGS } from "../action/actionTypes";

const initialState = {
  tags: {}
}

export default function tags(state = initialState.tags, action) {
  switch (action.type) {
    case FECTH_TAGS:
      return getListTag(state, action.tags)
    default:
      return state;
  }
}

function getListTag(state, payload) {
  return {
    ...state,
    tags: payload
  }
}