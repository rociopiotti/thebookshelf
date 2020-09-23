import axios from "axios";
import { BOOK_ADD, BOOK_CLEAR } from "../types";

/*================ BOOKS =============*/
export function addBook(book) {
  const request = axios
    .post("/api/books/book", book)
    .then((response) => response.data);
  return {
    type: BOOK_ADD,
    payload: request,
  };
}

export function clearBook(book) {
  return {
    type: BOOK_CLEAR,
    payload: null,
  };
}
