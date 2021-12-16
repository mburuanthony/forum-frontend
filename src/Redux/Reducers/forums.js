import {
  view_forums,
  get_forum,
  create_forum,
  delete_forum,
} from "../Actions/types";

const initialState = {
  forums: [],
  forum: {},
};

export default function forums(state = initialState, action) {
  switch (action.type) {
    case view_forums:
      return { ...state, forums: action.payload };
    case get_forum:
      return { ...state, forum: action.payload };
    case create_forum:
      return { ...state, ...action.payload };
    case delete_forum:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
