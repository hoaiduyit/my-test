import { call, put, all, fork, takeEvery } from 'redux-saga/effects';
import constants from '../../utils/constants';
import {
  fetchArticle,
  failToFetchArticleList,
  fetchUserArticles,
  fetchArticleComment,
} from '../action/article';
import { fetchTags } from '../action/tag';
import { saveUserInfo } from '../action/user';
import { fetchAuthorProfile, getFavoritedArticlesList } from '../action/author';
import {
  getArticleList,
  getListTags,
  getUserInfo,
  articleComment,
  addComment,
  deleteComment,
  getAuthorProfile,
  followAuthor,
  unfollowAuthor,
  getUserFeed,
  favoriteArticles,
  filterByAuthor,
} from '../../services';
import {
  ADD_USERNAME_TO_FETCH,
  UPDATE_COMMENT,
  REFETCH_AUTHOR_BY_ACTION,
  REFETCH_FAVORITED_ARTICLES,
} from '../action/actionTypes';

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

function* fetchUserArticleList(action) {
  const { token } = action;
  if (token) {
    const articles = yield call(getUserFeed, token);
    yield put(fetchUserArticles(articles.articles));
  }
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
    const deleteCom = yield call(deleteComment, articleId, token, commentId);
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

function* fetchAuthor(action) {
  const { authorName, token, key } = action;
  if (token === undefined) {
    const author = yield call(getAuthorProfile, authorName);
    if (author) {
      if (!author.error) {
        yield put(fetchAuthorProfile(author.profile));
      } else {
        yield put(fetchAuthorProfile({}));
      }
    } else {
      yield put(fetchAuthorProfile({}));
    }
  } else {
    if (key === 'follow') {
      const follow = yield call(followAuthor, authorName, token);
      if (follow.profile) {
        yield put({ type: ADD_USERNAME_TO_FETCH, token });
      }
    } else if (key === 'unfollow') {
      const unfollow = yield call(unfollowAuthor, authorName, token);
      if (unfollow.profile) {
        yield put({ type: ADD_USERNAME_TO_FETCH, token });
      }
    }
  }
}

function* fetchFavoritedArticles(action) {
  const { username, key } = action;
  if (key === 'favoriteArticles') {
    const articles = yield call(favoriteArticles, username);
    yield put(getFavoritedArticlesList(articles.articles));
  } else if (key === 'myArticles') {
    const articles = yield call(filterByAuthor, username);
    yield put(getFavoritedArticlesList(articles.articles));
  }
}

function* fetchToSaga() {
  yield all([
    fork(listArticles),
    fork(listTags),
    fork(userInfoAfterLogin),
    takeEvery(ADD_USERNAME_TO_FETCH, fetchUserArticleList),
    takeEvery(UPDATE_COMMENT, fetchComment),
    takeEvery(REFETCH_AUTHOR_BY_ACTION, fetchAuthor),
    takeEvery(REFETCH_FAVORITED_ARTICLES, fetchFavoritedArticles),
  ]);
}

export default fetchToSaga;
