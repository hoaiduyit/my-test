import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducer';
import { fetchToSaga, updateToSaga } from '../saga';

const sagaMiddleware = createSagaMiddleware();

const configStore = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(fetchToSaga, updateToSaga);

export default configStore;
