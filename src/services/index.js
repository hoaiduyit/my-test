import {
  getArticleList,
  filterByAuthor,
  favoriteArticles,
  getAuthorProfile,
  articleDetail,
  articleComment,
  addComment,
  addNewArticle
} from "./articles";
import { getListTags, filterArticlesByTag } from "./tags";
import { signUp, signIn } from "./login-register"
import { getUserInfo, updateUserInfo } from "./user"

export {
  getArticleList,
  getListTags,
  filterArticlesByTag,
  getAuthorProfile,
  filterByAuthor,
  favoriteArticles,
  articleDetail,
  articleComment,
  signUp,
  signIn,
  addComment,
  getUserInfo,
  updateUserInfo,
  addNewArticle
}
