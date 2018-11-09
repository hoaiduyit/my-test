import { FETCH_ARTICLES, FECTH_TAGS, FAIL_TO_FETCH_ARTICLE } from "../action/actionTypes";

const initialState = {
  articles: {},
  tags: {}
}

export function articles(state = initialState.articles, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return getListArticles(state, action.articles)
    case FAIL_TO_FETCH_ARTICLE:
      return failToFetch(state, action.errors)
    default:
      return state;
  }
}

export function tags(state = initialState.tags, action) {
  switch (action.type) {
    case FECTH_TAGS:
      return getListTag(state, action.tags)
    default:
      return state;
  }
}

function getListArticles(state, payload) {
  return {
    ...state,
    articles: payload
  }
}

function getListTag(state, payload) {
  return {
    ...state,
    tags: payload
  }
}

function failToFetch(state, payload) {
  if (payload) {
    return {
      ...state,
      errors: payload
    }
  }
}