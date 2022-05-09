import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {

  uploadDocument(formData) {
    return axios.post(API_URL + "uploadDocument", formData, { headers: authHeader() });
  }

  getAllDocuments() {
    return axios.get(API_URL + "documents", { headers: authHeader() });
  }

  getDocumentByUploadedUser() {
    return axios.get(API_URL + "documentByUploadedUser", { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + "users", { headers: authHeader() });
  }

  updateDocumentStatus(id,status) {
     return axios.get(API_URL + "updateDocumentStatus/" + id, { params: {status}}, { headers: authHeader() })
  }
}

export default new UserService();
