import React, { useState, useEffect } from "react";

import "./Homepage.css";
import articleService from "../../Service/articleService";
import categoryService from "../../Service/categoryService";
import ArticlePopup from "../Articlepopup/Articlepopup";

export default function HomePage(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(
    (e) => {
      categoryService
        .getAllCategories()
        .then((response) => {
          if (response.status === 200) {
            setCategories(response.data.categories);
          } else {
            localStorage.removeItem("TOKEN");
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.removeItem("TOKEN");
          }
        });
      articleService
        .getAllArticles(1, limit)
        .then((response) => {
          if (response.status === 200) {
            setArticles(response.data.articles);
            console.log(response.data.articles);
            setCount(response.data.count);
          } else {
            localStorage.removeItem("TOKEN");
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.removeItem("TOKEN");
          }
        });
    },
    [limit, selectedCategory.id]
  );

  const handlepagechange = async (page) => {
    console.log("PAGE ===> ", page);
    setCurrentPage(page);
    console.log(page, limit, selectedCategory);
    await articleService
      .getAllArticles(
        page,
        limit,
        selectedCategory.id ? selectedCategory.id : null
      )
      .then((response) => {
        if (response.status === 200) {
          setArticles(response.data.articles);
          console.log(response.data.articles);
          setCount(response.data.count);
        } else {
          localStorage.removeItem("TOKEN");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.removeItem("TOKEN");
        }
      });
  };

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    await articleService
      .getAllArticles(currentPage, limit, categoryId)
      .then((response) => {
        if (response.status === 200) {
          setArticles(response.data.articles);
          console.log(response.data.articles);
          setCount(response.data.count);
        } else {
          localStorage.removeItem("TOKEN");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.removeItem("TOKEN");
        }
      });
    setCurrentPage(1);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleClosePopup = () => {
    setSelectedArticle(null);
  };

  const handleUpdateArticle = async (updatedArticle) => {
    // Logic to update the article in the state
    console.log("Updated Article:", updatedArticle);
    await articleService
      .updateArticlebyId(updatedArticle.id, updatedArticle)
      .then((response) => {
        if (response.status === 200) {
          const updatedArticles = articles.map((article) =>
            article.id === updatedArticle.id ? updatedArticle : article
          );
          setArticles(updatedArticles);
        } else {
          localStorage.removeItem("TOKEN");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.removeItem("TOKEN");
        }
      });
  };

  let totalPages = Math.ceil(count / limit);
  return (
    <div className="container">
      <h1>Articles</h1>
      <div className="controls">
        <div className="filter">
          <label htmlFor="categoryFilter">Filter by Category: </label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="limit">
          <label htmlFor="limitSelect">Articles per Page: </label>
          <select id="limitSelect" value={limit} onChange={handleLimitChange}>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <table className="article-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} onClick={(e) => setSelectedArticle(article)}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.author.name}</td>
              <td>{article.category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedArticle && (
        <ArticlePopup
          article={selectedArticle}
          onClose={handleClosePopup}
          categories={categories}
          onUpdate={handleUpdateArticle}
        />
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlepagechange(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
}
