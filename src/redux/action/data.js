import * as types from "./actionTypes"

export const fetchArticle = (articles) => ({ type: types.FETCH_ARTICLES, articles: articles })
export const fetchTags = (tags) => ({ type: types.FECTH_TAGS, tags: tags });
export const filterByTag = (tagName) => ({ type: types.FILTER_BY_TAG, tagName: tagName });

export const saveUserInfo = (user) => ({ type: types.FETCH_USER_INFO, user: user });
export const updateUserInfo = (email, username, password, bio, imageUrl, token) => (
  {
    type: types.UPDATE_USER_INFO,
    email,
    username,
    password,
    bio,
    imageUrl,
    token
  });

export const updateArticle = (title, description, body, tagList, token) => ({
  type: types.UPDATE_ARTICLE,
  title,
  description,
  body,
  tagList,
  token
});

export const failToFetchUserInfo = (errors) => ({ type: types.FAIL_TO_FETCH_USER_INFO, errors });
export const failToFetchArticleList = (errors) => ({ type: types.FAIL_TO_FETCH_ARTICLE, errors });