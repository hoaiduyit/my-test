import {
  FETCH_AUTHOR_PROFILE,
  FETCH_FAVORITED_ARTICLES,
} from '../action/actionTypes';

const initialState = {
  authorProfile: {},
  favoritedArticles: [],
};

export default function authorInfo(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTHOR_PROFILE:
      return getAuthorProfile(state, action.authorProfile);
    case FETCH_FAVORITED_ARTICLES:
      return getFavoritedArticlesList(state, action.favoritedArticles);
    default:
      return state;
  }
}

function getAuthorProfile(state, payload) {
  return {
    ...state,
    authorProfile: payload,
  };
}

function getFavoritedArticlesList(state, payload) {
  return {
    ...state,
    favoritedArticles: payload,
  };
}
