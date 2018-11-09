import { FETCH_USER_INFO, FAIL_TO_FETCH_USER_INFO } from "../action/actionTypes"

const initialState = {
  isLogin: false,
  user: {}
}

export function userInfo(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_INFO:
      return saveUserInfo(state, action.user)
    case FAIL_TO_FETCH_USER_INFO:
      return failToFetch(state, action.errors)
    default:
      return state;
  }
}

function saveUserInfo(state, payload) {
  if (payload) {
    return {
      ...state,
      isLogin: true,
      user: payload
    };
  }
  return state
}

function failToFetch(state, payload) {
  if (payload) {
    return {
      ...state,
      errors: payload
    }
  }
}