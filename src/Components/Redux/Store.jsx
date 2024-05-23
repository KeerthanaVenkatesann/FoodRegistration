// import { createStore, applyMiddleware } from 'redux';

// import rootReducer from '../Reducer/Reducer';
// import { thunk } from 'redux-thunk';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../Reducer/Reducer";
import rootSaga from "../Saga/Saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
