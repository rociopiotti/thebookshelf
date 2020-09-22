import { BOOK_ADD } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case BOOK_ADD:
      return { ...state, add: action.payload };
    default:
      return state;
  }
}
