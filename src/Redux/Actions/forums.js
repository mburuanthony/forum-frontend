import { axiosconfig } from "./axios.config";
import { view_forums, get_forum, create_forum, delete_forum } from "./types";
import { UserAuthToken } from "./auth";

export const ViewForums = () => (dispatch) => {
  axiosconfig
    .get("app/forums/")
    .then((res) => {
      dispatch({ type: view_forums, payload: res.data });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const GetForum =
  ({ forum_id }) =>
  (dispatch) => {
    axiosconfig
      .get(`app/forums/${forum_id}/`)
      .then((res) => {
        dispatch({ type: get_forum, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };

export const DeleteForum =
  ({ forum_id }) =>
  (dispatch, getState) => {
    axiosconfig
      .delete(`app/forums/${forum_id}/`, UserAuthToken(getState))
      .then((res) => {
        dispatch({ type: delete_forum });
      })
      .catch((e) => {
        console.log(e);
      });
  };

export const CreateForum =
  ({ title, message, media }) =>
  (dispatch, getState) => {
    const body = { title, message, media };
    axiosconfig
      .post("app/forums/", body, UserAuthToken(getState))
      .then((res) => {
        dispatch({ type: create_forum, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };
