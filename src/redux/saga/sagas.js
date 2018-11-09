import { call, put, all, fork, takeEvery } from "redux-saga/effects"
import constants from "../../utils/constants"
import { fetchArticle, fetchTags, saveUserInfo, failToFetchUserInfo, failToFetchArticleList } from "../action/data"
import {
  getArticleList,
  getListTags,
  getUserInfo,
  filterArticlesByTag,
  updateUserInfo,
  addNewArticle
} from "../../services"
import {
  FILTER_BY_TAG,
  UPDATE_ARTICLE,
  UPDATE_USER_INFO
} from "../action/actionTypes";

function getUserTokenFromLocalStore() {
  const userToken = localStorage.getItem(constants.USER_TOKEN);
  return userToken && getUserInfo(userToken);
}

function* userInfoAfterLogin() {
  const user = yield call(getUserTokenFromLocalStore);
  yield put(saveUserInfo(user.user));
}

function* listArticles() {
  const articles = yield call(getArticleList);
  yield put(fetchArticle(articles));
}

function* listTags() {
  const tags = yield call(getListTags);
  yield put(fetchTags(tags));
}

function* filterArticles(action) {
  const articles = yield call(filterArticlesByTag, action.tagName);
  yield put(fetchArticle(articles))
}

function* updateUserSaga(action) {
  const { email, username, password, image, bio, token } = action;
  const user = yield call(updateUserInfo, email, username, password, image, bio, token);
  if (user.errors) {
    yield put(failToFetchUserInfo(user.errors));
  } else {
    yield put(failToFetchUserInfo({}));
    yield put(saveUserInfo(user.user));
    yield all([fork(listArticles), fork(listTags)]);
  }
}

function* refectchArticleListAndTagListAfterUpdateArticle(action) {
  const { title, description, body, tagList, token } = action;
  const article = yield call(addNewArticle, title, description, body, tagList, token);
  if (article.errors) {
    yield put(failToFetchArticleList(article.errors));
  } else {
    yield put(failToFetchArticleList({}));
    yield all([fork(listArticles), fork(listTags)]);
  }

}

function* mySaga() {
  yield all([
    fork(listArticles),
    fork(listTags),
    fork(userInfoAfterLogin),
    takeEvery(FILTER_BY_TAG, filterArticles),
    takeEvery(UPDATE_USER_INFO, updateUserSaga),
    takeEvery(UPDATE_ARTICLE, refectchArticleListAndTagListAfterUpdateArticle)
  ])
};

export default mySaga;