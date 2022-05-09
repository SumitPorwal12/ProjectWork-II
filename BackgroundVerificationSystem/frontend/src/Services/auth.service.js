import axios from "axios";
import { history } from '../helpers/history';

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    history.push("/login");
    window.location.reload();
  }

  register(name, username, email, password, roles) {
    return axios.post(API_URL + "signup", {
      name,
      username,
      email,
      password,
      roles
    });
  }

  isLoggedIn() {
     let token = JSON.parse(localStorage.getItem('user'));
     if(!token) {
        return false;
     }
     return true;
  }
}

export default new AuthService();