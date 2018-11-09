import * as types from "../actionTypes"

export const fetchArticle = (articles) => ({ type: types.FETCH_ARTICLES, articles: articles })
export const updateArticle = (title, description, body, tagList, token, articleId) => ({
  type: types.UPDATE_ARTICLE,
  title,
  description,
  body,
  tagList,
  token,
  articleId
});
export const deleteArticle = (token, articleId) => ({ type: types.DELETE_ARTICLE, token, articleId });
export const failToFetchArticleList = (errors) => ({ type: types.FAIL_TO_FETCH_ARTICLE, errors });
export const fetchUserArticles = (userArticles) => ({ type: types.FETCH_USER_ARTICLE, userArticles });
export const addUsernameToFetch = (username) => ({ type: types.ADD_USERNAME_TO_FETCH, username });

export const fetchArticleComment = (comments) => ({ type: types.FETCH_COMMENTS, comments });
export const updateComment = (articleId, body, token, commentId) => ({ type: types.UPDATE_COMMENT, articleId, body, token, commentId });