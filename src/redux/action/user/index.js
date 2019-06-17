import * as types from '../actionTypes';

export const saveUserInfo = user => ({
  type: types.FETCH_USER_INFO,
  user,
});
export const updateUserInfo = (
  email,
  username,
  password,
  bio,
  imageUrl,
  token
) => ({
  type: types.UPDATE_USER_INFO,
  email,
  username,
  password,
  bio,
  imageUrl,
  token,
});
export const failToFetchUserInfo = errors => ({
  type: types.FAIL_TO_FETCH_USER_INFO,
  errors,
});
export const getFollowingAuthorsList = followingAuthors => ({
  type: types.FOLLOWING_AUTHORS,
  followingAuthors,
});

export const fetchFavoritedArticles = (username, key) => ({
  type: types.REFETCH_FAVORITED_ARTICLES,
  username,
  key,
});
