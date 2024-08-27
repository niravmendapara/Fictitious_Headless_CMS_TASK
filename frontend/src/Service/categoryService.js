import http from "./Http-common";

class CategoryDataService {
  // Here is the function to call API in Backend for all categories
  getAllCategories() {
    return http.get("/categories/");
  }
}

export default new CategoryDataService();
