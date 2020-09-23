import { BOOK_ADD, BOOK_CLEAR, BOOK_GET } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case BOOK_ADD:
      return { ...state, add: action.payload };
    case BOOK_CLEAR:
      return { ...state, add: action.payload };
    case BOOK_GET:
      return { ...state, single: action.payload };
    default:
      return state;
  }
}
