import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USER,
} from "./Types"; // Ensure the correct relative path to Types.js

export const createUser = (user) => ({
  type: CREATE_USER,
  payload: user,
});

export const updateUser = (id, user) => ({
  type: UPDATE_USER,
  payload: { id, user },
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const fetchUser = (id) => ({
  type: FETCH_USER,
  payload: id,
});
