import * as types from '../actionTypes';

export const fetchArticle = articles => ({
  type: types.FETCH_ARTICLES,
  articles,
});
export const updateArticle = (
  title,
  description,
  body,
  tagList,
  token,
  articleId
) => ({
  type: types.UPDATE_ARTICLE,
  title,
  description,
  body,
  tagList,
  token,
  articleId,
});
export const deleteArticle = (token, articleId) => ({
  type: types.DELETE_ARTICLE,
  token,
  articleId,
});
export const failToFetchArticleList = errors => ({
  type: types.FAIL_TO_FETCH_ARTICLE,
  errors,
});
export const fetchUserArticles = userArticles => ({
  type: types.FETCH_USER_ARTICLE,
  userArticles,
});
export const addUsernameToFetch = token => ({
  type: types.ADD_USERNAME_TO_FETCH,
  token,
});

export const fetchArticleComment = comments => ({
  type: types.FETCH_COMMENTS,
  comments,
});
export const updateComment = (articleId, body, token, commentId) => ({
  type: types.UPDATE_COMMENT,
  articleId,
  body,
  token,
  commentId,
});

export const actionOnArticle = (articleId, token, key, username) => ({
  type: types.LIKE_UNLIKE_ARTICLE,
  articleId,
  token,
  key,
  username,
});

export const changePage = (itemPerPage, offset) => ({
  type: types.CHANGE_PAGE,
  itemPerPage,
  offset,
});
