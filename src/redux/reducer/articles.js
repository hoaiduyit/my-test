import {
  FETCH_ARTICLES,
  FAIL_TO_FETCH_ARTICLE,
  FETCH_USER_ARTICLE,
  FETCH_COMMENTS,
} from '../action/actionTypes';

const initialState = {
  articles: {},
  userArticles: {},
  comments: [],
};

export default function articles(state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return getListArticles(state, action.articles);
    case FAIL_TO_FETCH_ARTICLE:
      return failToFetch(state, action.errors);
    case FETCH_USER_ARTICLE:
      return getUserArticleList(state, action.userArticles);
    case FETCH_COMMENTS:
      return getArticleComments(state, action.comments);
    default:
      return state;
  }
}

function getListArticles(state, payload) {
  return {
    ...state,
    articles: payload,
  };
}

function getUserArticleList(state, payload) {
  return {
    ...state,
    userArticles: payload,
  };
}

function getArticleComments(state, payload) {
  return {
    ...state,
    comments: payload,
  };
}

function failToFetch(state, payload) {
  if (payload) {
    return {
      ...state,
      errors: payload,
    };
  }
}
