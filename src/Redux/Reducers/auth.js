import {
  auth_signup,
  auth_login,
  auth_signout,
  auth_user,
} from "../Actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  user: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case auth_signup:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };

    case auth_login:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };

    case auth_user:
      return { ...state, user: action.payload };

    case auth_signout:
      localStorage.removeItem("token");
      return { ...state, token: null, user: {} };

    default:
      return state;
  }
}
