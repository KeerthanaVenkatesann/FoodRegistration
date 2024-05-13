
import axios from "axios";
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USER,
} from "./Types";
import { API_BASE_URL } from "../../Service/Api";



export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_BASE_URL, user);
      dispatch({ type: CREATE_USER, payload: response.data });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
};

export const updateUser = (id, user) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, user);
      dispatch({ type: UPDATE_USER, payload: response.data });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_BASE_URL);
      dispatch({ type: FETCH_USERS, payload: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      dispatch({ type: FETCH_USER, payload: response.data });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
};
