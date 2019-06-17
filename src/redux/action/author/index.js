import * as types from '../actionTypes';

export const fetchAuthorProfile = authorProfile => ({
  type: types.FETCH_AUTHOR_PROFILE,
  authorProfile,
});
export const refetchAuthorProfileWithAction = (authorName, token, key) => ({
  type: types.REFETCH_AUTHOR_BY_ACTION,
  authorName,
  token,
  key,
});

export const getFavoritedArticlesList = favoritedArticles => ({
  type: types.FETCH_FAVORITED_ARTICLES,
  favoritedArticles,
});
