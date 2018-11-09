import { call, put, all, fork, takeEvery } from "redux-saga/effects"
import constants from "../../utils/constants"
import { fetchArticle, failToFetchArticleList, fetchUserArticles, fetchArticleComment } from "../action/article"
import { fetchTags } from "../action/tag"
import { saveUserInfo, failToFetchUserInfo } from "../action/user"
import {
  getArticleList,
  getListTags,
  getUserInfo,
  filterArticlesByTag,
  updateUserInfo,
  addNewArticle,
  filterByAuthor,
  updateArticle,
  deleteUserArticle,
  articleComment,
  addComment,
  deleteComment
} from "../../services"
import {
  FILTER_BY_TAG,
  UPDATE_ARTICLE,
  UPDATE_USER_INFO,
  ADD_USERNAME_TO_FETCH,
  DELETE_ARTICLE,
  UPDATE_COMMENT
} from "../action/actionTypes";

function getUserTokenFromLocalStore() {
  const userToken = localStorage.getItem(constants.USER_TOKEN);
  return userToken && getUserInfo(userToken);
}

function* userInfoAfterLogin() {
  const user = yield call(getUserTokenFromLocalStore);
  if (user) {
    yield put(saveUserInfo(user.user));
  }
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
  if (articles.articles.length === 0) {
    yield fork(listArticles);
  } else {
    yield put(fetchArticle(articles))
  }
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

function* updateUserArticle(action) {
  const { title, description, body, tagList, token, articleId } = action;
  let article;
  if (articleId) {
    article = yield call(updateArticle, title, description, body, tagList, token, articleId);
  }
  if (!articleId) {
    article = yield call(addNewArticle, title, description, body, tagList, token);
  }
  if (article.errors) {
    yield put(failToFetchArticleList(article.errors));
  } else {
    yield put(failToFetchArticleList({}));
    yield all([fork(listArticles), fork(listTags)]);
  }
}

function* deleteArticle(action) {
  const { token, articleId } = action;
  const article = yield call(deleteUserArticle, token, articleId);
  if (article.errors) {
    console.log(article.errors);
  } else {
    yield all([fork(listArticles), fork(listTags)]);
  }
}

function* fetchUserArticleList(action) {
  const { username } = action;
  const articles = yield call(filterByAuthor, username);
  yield put(fetchUserArticles(articles.articles))
}

function* fetchListComment(comments) {
  yield put(failToFetchArticleList({}));
  yield put(fetchArticleComment(comments.comments));
}

function* fetchComment(action) {
  const { articleId, body, token, commentId } = action;
  let comments;
  if (body !== undefined) {
    const add = yield call(addComment, articleId, body, token);
    if (add.errors) {
      yield put(failToFetchArticleList(add.errors));
    } else {
      comments = yield call(articleComment, articleId);
      yield fetchListComment(comments);
    }
  } else if (commentId !== undefined) {
    const deleteCom = yield call(deleteComment, articleId, token, commentId)
    if (deleteCom.errors) {
      yield put(failToFetchArticleList(deleteCom.errors));
    } else {
      comments = yield call(articleComment, articleId);
      yield fetchListComment(comments);
    }
  } else {
    comments = yield call(articleComment, articleId);
    yield put(fetchArticleComment(comments.comments));
  }

}

function* mySaga() {
  yield all([
    fork(listArticles),
    fork(listTags),
    fork(userInfoAfterLogin),
    takeEvery(FILTER_BY_TAG, filterArticles),
    takeEvery(UPDATE_USER_INFO, updateUserSaga),
    takeEvery(UPDATE_ARTICLE, updateUserArticle),
    takeEvery(ADD_USERNAME_TO_FETCH, fetchUserArticleList),
    takeEvery(DELETE_ARTICLE, deleteArticle),
    takeEvery(UPDATE_COMMENT, fetchComment)
  ])
};

export default mySaga;