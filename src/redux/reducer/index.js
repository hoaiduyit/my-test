import { combineReducers } from "redux"
import articles from "./articles";
import tags from "./tags";
import userInfo from "./user";
import authorInfo from "./author"

const rootReducer = combineReducers({
  articles,
  tags,
  userInfo,
  authorInfo
});

export default rootReducer;