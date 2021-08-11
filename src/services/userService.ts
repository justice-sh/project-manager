import { User } from "@auth0/auth0-react";
import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = "apiUrl" + "/users";

export function register(user) {
  // return http.post(apiEndpoint, {
  //   email: user.username,
  //   password: user.password,
  //   name: user.name,
  // });
}

function transform(user: User) {}

const user = {
  register,
};

export default user;
