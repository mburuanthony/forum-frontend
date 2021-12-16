import { axiosconfig } from "./axios.config";
import { view_comments, create_comment, delete_comment } from "./types";
import { UserAuthToken } from "./auth";

export const ViewComments =
  ({ forum_id }) =>
  (dispatch) => {
    axiosconfig
      .get(`app/forums/${forum_id}/replies/`)
      .then((res) => {
        dispatch({ type: view_comments, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };

export const AddComment =
  ({ forum_id, message, media }) =>
  (dispatch, getState) => {
    const body = { message, media };
    axiosconfig
      .post(`app/forums/${forum_id}/replies/`, body, UserAuthToken(getState))
      .then((res) => {
        dispatch({ type: create_comment, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };

export const DeleteComment =
  ({ forum_id, comment_id }) =>
  (dispatch, getState) => {
    axiosconfig
      .delete(
        `app/forums/${forum_id}/replies/${comment_id}`,
        UserAuthToken(getState)
      )
      .then((res) => {
        dispatch({ type: delete_comment, payload: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };
