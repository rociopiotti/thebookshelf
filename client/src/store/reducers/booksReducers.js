import {
  BOOK_ADD,
  BOOK_CLEAR,
  BOOK_GET,
  BOOK_UPDATE,
  BOOKS_GET,
} from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case BOOK_ADD:
      return { ...state, add: action.payload };
    case BOOK_CLEAR:
      return {
        ...state,
        add: action.payload,
        single: action.payload,
        update: action.payload,
      };
    case BOOK_GET:
      return { ...state, single: action.payload };
    case BOOK_UPDATE:
      return { ...state, update: action.payload };
    case BOOKS_GET:
      return { ...state, collection: action.payload };
    default:
      return state;
  }
}
