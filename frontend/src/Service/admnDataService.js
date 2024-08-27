import http from "./Http-common";

class AdminDataservice {
  login(username, password) {
    return http.post("/auth", { username, password });
  }
}

export default new AdminDataservice();
