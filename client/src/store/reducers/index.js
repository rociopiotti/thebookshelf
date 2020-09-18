import { combineReducers } from "redux";
import books from "./booksReducers";
import user from "./usersReducer"

const rootReducer = combineReducers({
    books,
    user
});

export default rootReducer;
