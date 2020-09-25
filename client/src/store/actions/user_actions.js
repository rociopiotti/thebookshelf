import axios from "axios";
import { USER_LOGIN, USER_AUTH, USER_LOGOUT} from "../types";

/*================ USER =============*/
export function loginUser({ email, password }) {
  const request = axios
    .post("/api/users/login", { email, password })
    .then((response) => response.data);
  return {
    type: USER_LOGIN,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);
  return {
    type: USER_AUTH,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios.get("/api/users/logout").then((response) => {
    return null;
  });
  return {
    type: USER_LOGOUT,
    payload: request,
  };
}


