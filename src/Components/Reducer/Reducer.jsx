// // reducer.js
// import {
//   CREATE_USER,
//   UPDATE_USER,
//   DELETE_USER,
//   FETCH_USERS,
//   FETCH_USER,
// } from "./Actiontype/Types";

// const initialState = {
//   users: [],
//   user: null,
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CREATE_USER:
//       return {
//         ...state,
//         users: [...state.users, action.payload],
//       };
//     case UPDATE_USER:
//       return {
//         ...state,
//         users: state.users.map((user) =>
//           user.id === action.payload.id ? action.payload : user
//         ),
//       };
//     case DELETE_USER:
//       return {
//         ...state,
//         users: state.users.filter((user) => user.id !== action.payload),
//       };
//     case FETCH_USERS:
//       return {
//         ...state,
//         users: action.payload,
//       };
//     case FETCH_USER:
//       return {
//         ...state,
//         user: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;

import {
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
} from "./Actiontype/Types";

const initialState = {
  users: [],
  user: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
