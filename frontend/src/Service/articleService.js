import http from "./Http-common";

class ArticleDataService {
  // Here is the function to call API in Backend by filtering page, limit and categories
  getAllArticles(page = 1, limit = 2, category = null) {
    const query = new URLSearchParams({
      page: page,
      limit: limit,
    });

    if (category) {
      query.append("category", category);
    }

    return http.get(`/articles/?${query}`);
  }

  // this is the function which will call perticular Articly by Id
  updateArticlebyId(id, articleobject) {
    return http.put(`/articles/${id}`, articleobject);
  }
}

export default new ArticleDataService();
