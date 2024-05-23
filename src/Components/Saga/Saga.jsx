import { call, put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USER,
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
} from "../Reducer/Actiontype/Types";
import { API_BASE_URL } from "../Service/Api";

// Worker Sagas
function* createUser(action) {
  try {
    const response = yield call(axios.post, API_BASE_URL, action.payload);
    yield put({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

function* updateUser(action) {
  try {
    const response = yield call(
      axios.put,
      `${API_BASE_URL}/${action.payload.id}`,
      action.payload.user
    );
    yield put({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

function* deleteUser(action) {
  try {
    yield call(axios.delete, `${API_BASE_URL}/${action.payload}`);
    yield put({ type: DELETE_USER_SUCCESS, payload: action.payload });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

function* fetchUsers() {
  try {
    const response = yield call(axios.get, API_BASE_URL);
    yield put({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function* fetchUser(action) {
  try {
    const response = yield call(axios.get, `${API_BASE_URL}/${action.payload}`);
    yield put({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

// Watcher Sagas
function* watchCreateUser() {
  yield takeEvery(CREATE_USER, createUser);
}

function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER, updateUser);
}

function* watchDeleteUser() {
  yield takeEvery(DELETE_USER, deleteUser);
}

function* watchFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsers);
}

function* watchFetchUser() {
  yield takeEvery(FETCH_USER, fetchUser);
}

// Root Saga
export default function* rootSaga() {
  yield all([
    watchCreateUser(),
    watchUpdateUser(),
    watchDeleteUser(),
    watchFetchUsers(),
    watchFetchUser(),
  ]);
}
