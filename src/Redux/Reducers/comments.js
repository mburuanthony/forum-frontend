import {
  view_comments,
  create_comment,
  delete_comment,
} from "../Actions/types";

const initialState = {
  comments: [],
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case view_comments:
      return { ...state, comments: action.payload };
    case create_comment:
      return { ...state, ...action.payload };
    case delete_comment:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
