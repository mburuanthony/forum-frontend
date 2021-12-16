import { get_error } from "../Actions/types";

const initialState = {
  error: {},
};

export default function error(state = initialState, action) {
  switch (action.type) {
    case get_error:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
