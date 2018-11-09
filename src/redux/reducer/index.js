import { combineReducers } from "redux"
import { articles, tags } from "./reducer";
import { userInfo } from "./user"

const rootReducer = combineReducers({
  articles,
  tags,
  userInfo
});

export default rootReducer;