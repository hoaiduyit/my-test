import { call, put, all, fork, takeEvery } from "redux-saga/effects"
import constants from "../../utils/constants"
import {
  fetchArticle,
  failToFetchArticleList,
  fetchUserArticles,
  fetchArticleComment,
} from "../action/article"
import { fetchTags } from "../action/tag"
import { saveUserInfo, failToFetchUserInfo, getUserFavoritedArticlesList } from "../action/user"
import { fetchAuthorProfile, getFavoritedArticlesList } from "../action/author"
import {
  getArticleList,
  getListTags,
  getUserInfo,
  filterArticlesByTag,
  updateUserInfo,
  addNewArticle,
  updateArticle,
  deleteUserArticle,
  articleComment,
  addComment,
  deleteComment,
  getAuthorProfile,
  followAuthor,
  unfollowAuthor,
  likeArticle,
  unlikeArticle,
  getUserFeed,
  favoriteArticles,
  filterByAuthor,
  pagination
} from "../../services"
import {
  FILTER_BY_TAG,
  UPDATE_ARTICLE,
  UPDATE_USER_INFO,
  ADD_USERNAME_TO_FETCH,
  DELETE_ARTICLE,
  UPDATE_COMMENT,
  REFETCH_AUTHOR_BY_ACTION,
  LIKE_UNLIKE_ARTICLE,
  REFETCH_FAVORITED_ARTICLES,
  CHANGE_PAGE
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
  const { token } = action;
  if (token) {
    const articles = yield call(getUserFeed, token);
    yield put(fetchUserArticles(articles.articles))
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

function* fetchAuthor(action) {
  const { authorName, token, key } = action;
  if (token === undefined) {
    const author = yield call(getAuthorProfile, authorName);
    yield put(fetchAuthorProfile(author.profile));
  } else {
    if (key === "follow") {
      const follow = yield call(followAuthor, authorName, token);
      if (follow.profile) {
        yield put({ type: ADD_USERNAME_TO_FETCH, token });
      }
    } else if (key === "unfollow") {
      const unfollow = yield call(unfollowAuthor, authorName, token);
      if (unfollow.profile) {
        yield put({ type: ADD_USERNAME_TO_FETCH, token });
      }
    }
  }
}

function* fetchFavoritedArticles(action) {
  const { username, key } = action;
  if (key === "favoriteArticles") {
    const articles = yield call(favoriteArticles, username);
    yield put(getFavoritedArticlesList(articles.articles));
  } else if (key === "myArticles") {
    const articles = yield call(filterByAuthor, username);
    yield put(getFavoritedArticlesList(articles.articles))
  }
}

function* likeAndUnlikeArticle(action) {
  const { articleId, token, key } = action;
  if (key === "like") {
    const like = yield call(likeArticle, articleId, token);
    if (like.article) {
      yield all([fork(listArticles), fork(listTags)]);
    }
  } else if (key === "unlike") {
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
    yield put(fetchArticle(articles))
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
    takeEvery(UPDATE_COMMENT, fetchComment),
    takeEvery(REFETCH_AUTHOR_BY_ACTION, fetchAuthor),
    takeEvery(LIKE_UNLIKE_ARTICLE, likeAndUnlikeArticle),
    takeEvery(REFETCH_FAVORITED_ARTICLES, fetchFavoritedArticles),
    takeEvery(CHANGE_PAGE, changePage)
  ])
};

export default mySaga;