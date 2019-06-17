import { call, put, all, fork, takeEvery } from 'redux-saga/effects';
import { fetchArticle, failToFetchArticleList } from '../action/article';
import { saveUserInfo, failToFetchUserInfo } from '../action/user';
import {
  filterArticlesByTag,
  updateUserInfo,
  addNewArticle,
  updateArticle,
  deleteUserArticle,
  likeArticle,
  unlikeArticle,
  pagination,
} from '../../services';
import {
  FILTER_BY_TAG,
  UPDATE_ARTICLE,
  UPDATE_USER_INFO,
  DELETE_ARTICLE,
  LIKE_UNLIKE_ARTICLE,
  CHANGE_PAGE,
} from '../action/actionTypes';

function* filterArticles(action) {
  const articles = yield call(filterArticlesByTag, action.tagName);
  if (articles.articles.length === 0) {
    yield fork(listArticles);
  } else {
    yield put(fetchArticle(articles));
  }
}

function* updateUserSaga(action) {
  const { email, username, password, image, bio, token } = action;
  const user = yield call(
    updateUserInfo,
    email,
    username,
    password,
    image,
    bio,
    token
  );
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
    article = yield call(
      updateArticle,
      title,
      description,
      body,
      tagList,
      token,
      articleId
    );
  }
  if (!articleId) {
    article = yield call(
      addNewArticle,
      title,
      description,
      body,
      tagList,
      token
    );
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

function* likeAndUnlikeArticle(action) {
  const { articleId, token, key } = action;
  if (key === 'like') {
    const like = yield call(likeArticle, articleId, token);
    if (like.article) {
      yield all([fork(listArticles), fork(listTags)]);
    }
  } else if (key === 'unlike') {
    const unlike = yield call(unlikeArticle, articleId, token);
    if (unlike.article) {
      yield all([fork(listArticles), fork(listTags)]);
    }
  }
}

function* changePage(action) {
  const { itemPerPage, offset } = action;
  const articles = yield call(pagination, itemPerPage, offset);
  if (articles.articles.length === 0) {
    yield fork(listArticles);
  } else {
    yield put(fetchArticle(articles));
  }
}

function* updateToSaga() {
  yield all([
    takeEvery(FILTER_BY_TAG, filterArticles),
    takeEvery(UPDATE_USER_INFO, updateUserSaga),
    takeEvery(UPDATE_ARTICLE, updateUserArticle),
    takeEvery(DELETE_ARTICLE, deleteArticle),
    takeEvery(LIKE_UNLIKE_ARTICLE, likeAndUnlikeArticle),
    takeEvery(CHANGE_PAGE, changePage),
  ]);
}

export default updateToSaga;
