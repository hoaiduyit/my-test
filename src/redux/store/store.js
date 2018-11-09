import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "../reducer"
import mySaga from "../saga/sagas"

const sagaMiddleware = createSagaMiddleware()

const configStore = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga)

export default configStore;