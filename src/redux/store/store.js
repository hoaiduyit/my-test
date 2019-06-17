import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import reducer from '../reducer';
import { fetchToSaga, updateToSaga } from '../saga';

const sagaMiddleware = createSagaMiddleware();

const configStore = createStore(reducer, applyMiddleware(sagaMiddleware));

function* combineSaga() {
  yield all([fork(fetchToSaga), fork(updateToSaga)]);
}

sagaMiddleware.run(combineSaga);

export default configStore;
