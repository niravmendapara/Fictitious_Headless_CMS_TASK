const { filterByCategories } = require('../utils/contentFilter');
const { paginateData } = require('../utils/contentPagination');
const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, './../../data/articles.json');
const categoriesPath = path.join(__dirname, './../../data/categories.json');

const getStaticArticles = () => {
    const data = fs.readFileSync(articlesPath, 'utf-8');
    return JSON.parse(data);
}

const getStaticCategories = () => {
    const data = fs.readFileSync(categoriesPath, 'utf-8');
    return JSON.parse(data);
}

const updateStaticArticles = (id, article) => {
    let articles = getStaticArticles();
    articles = articles?.map((item) => item.id == id ? article : item);
    
    const data = JSON.stringify(articles, null, 2); 
    fs.writeFileSync(articlesPath, data, 'utf-8');
    return article;
}


const fetchAllArticles = async (page = 1, limit = 10, categoryId = null) => {
    
    const data = getStaticArticles();
    
    // Filter by category if provided
    const filteredData = categoryId ? filterByCategories(data, categoryId) : data;
    
    // Paginate data
    const paginatedData = paginateData(filteredData, page, limit);

    return {articles: paginatedData, count: filteredData?.length};
};

const updateArticleById = async (id, article) => {
    return { article: updateStaticArticles(id, article) };
};

const fetchAllCategories = async (id) => {
    return {categories: getStaticCategories()};
};


module.exports = {
    fetchAllArticles,
    fetchAllCategories,
    updateArticleById
};