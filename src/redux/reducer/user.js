import { FETCH_USER_INFO, FAIL_TO_FETCH_USER_INFO, FOLLOWING_AUTHORS, USER_FAVORITED_ARTICLES } from "../action/actionTypes"

const initialState = {
  isLogin: false,
  user: {},
  userFavoritedArticles: [],
  followingAuthors: []
}

export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_INFO:
      return saveUserInfo(state, action.user)
    case FAIL_TO_FETCH_USER_INFO:
      return failToFetch(state, action.errors)
    case FOLLOWING_AUTHORS:
      return getFollowingAuthorsList(state, action.followingAuthors)
    case USER_FAVORITED_ARTICLES:
      return getUserFavoritedArticlesList(state, action.userFavoritedArticles)
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

function getFollowingAuthorsList(state, payload) {
  return {
    ...state,
    followingAuthors: payload
  }
}

function getUserFavoritedArticlesList(state, payload) {
  return {
    ...state,
    userFavoritedArticles: payload
  }
}