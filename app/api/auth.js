import { defaultClient } from "./client";

const login = (username, password) =>
  defaultClient.post("token/", { username, password });

const register = (userInfo) => defaultClient.post("register/", userInfo);

export default { login, register };
