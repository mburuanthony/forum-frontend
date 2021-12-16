import { axiosconfig } from "./axios.config";
import {
  auth_signup,
  auth_login,
  auth_signout,
  auth_user,
  get_error,
} from "./types";

export const AuthSignup =
  ({ username, email, password }) =>
  (dispatch) => {
    const body = { username, email, password };
    axiosconfig
      .post("auth/signup/", body)
      .then((res) => {
        dispatch({ type: auth_signup, payload: res.data });
      })
      .catch((e) => {
        const error = {
          message: e.response?.data,
          status: e.response?.status,
        };
        dispatch({ type: get_error, payload: error });
        console.log(e);
      });
  };

export const AuthLogin =
  ({ username, password }) =>
  (dispatch) => {
    const body = { username, password };
    axiosconfig
      .post("auth/login/", body)
      .then((res) => {
        dispatch({ type: auth_login, payload: res.data });
      })
      .catch((e) => {
        const error = {
          message: e.response?.data,
          status: e.response?.status,
        };
        dispatch({ type: get_error, payload: error });
        console.log(e);
      });
  };

export const GetAuthUser = () => (dispatch, getState) => {
  axiosconfig
    .get("auth/user/", UserAuthToken(getState))
    .then((res) => {
      dispatch({ type: auth_user, payload: res.data });
    })
    .catch((e) => {
      const error = {
        message: e.response?.data,
        status: e.response?.status,
      };
      dispatch({ type: get_error, payload: error });
      console.log(e);
    });
};

export const AuthLogOut = () => (dispatch, getState) => {
  axiosconfig
    .post("auth/logout/", null, UserAuthToken(getState))
    .then((res) => {
      dispatch({ type: auth_signout });
    })
    .catch((e) => {
      const error = {
        message: e.response?.data,
        status: e.response?.status,
      };
      dispatch({ type: get_error, payload: error });
      console.log(e);
    });
};

export const UserAuthToken = (getState) => {
  const token = getState().auth.token;
  const config = { headers: { "Content-Type": "application/json" } };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
