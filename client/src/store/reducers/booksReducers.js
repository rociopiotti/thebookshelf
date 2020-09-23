import { BOOK_ADD, BOOK_CLEAR } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case BOOK_ADD:
      return { ...state, add: action.payload };
    case BOOK_CLEAR:
      return { ...state, add: action.payload };
    default:
      return state;
  }
}
