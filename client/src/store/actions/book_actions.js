import axios from "axios";
import { BOOK_ADD, BOOK_CLEAR, BOOK_GET, BOOK_UPDATE } from "../types";

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

export function getBook(bookID) {
  const request = axios
    .get(`/api/books/book?id=${bookID}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return false;
    });

  return {
    type: BOOK_GET,
    payload: request,
  };
}

export function editBook(book) {
  const request = axios
    .patch(`/api/books/book`, book)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return false;
    });

  return {
    type: BOOK_UPDATE,
    payload: request,
  };
}
