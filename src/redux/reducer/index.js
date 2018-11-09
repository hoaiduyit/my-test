import { combineReducers } from "redux"
import articles from "./articles";
import tags from "./tags";
import userInfo from "./user";

const rootReducer = combineReducers({
  articles,
  tags,
  userInfo
});

export default rootReducer;