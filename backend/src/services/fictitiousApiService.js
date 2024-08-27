// API SERVICE that interact with fictitious headless cms

const axios = require('axios');
const { filterByCategories } = require('../utils/contentFilter');
const { paginateData } = require('../utils/contentPagination');

const CMS_API_URL = process.env.CMS_API_URL || 'https://fictitious-cms-api.com/content';

const fetchAllArticles = async (page = 1, limit = 10, categoryId = null) => {
    
    let url = `${CMS_API_URL}/artices`;
    // If CMS level pagination is required, we can uncomment given code and use it.// let url = `${CMS_API_URL}?page=${page}&limit=${limit}`;
    // if (category) {
    //     url += `&category=${category}`;
    // }
    
    // Local Pagination ( Fetch all data and do pagination and filter locally)
    const apiResponse = await axios.get(url);
    const data = content?.data;
    
    // Filter by category if provided
    const filteredData = categoryId ? filterByCategories(data, categoryId) : data;
    
    // Paginate data
    const paginatedData = paginateData(filteredData, page, limit);

    return {articles: paginatedData, count: filteredData?.length};
};

const updateArticleById = async (id, article) => {
    const response = await axios.put(`${CMS_API_URL}/articles/${id}`, article);
    return { article: response.data};
};

const fetchAllCategories = async (id) => {
    const response = await axios.get(`${CMS_API_URL}/categories`);
    return {categories: response.data};
};


module.exports = {
    fetchAllArticles,
    fetchAllCategories,
    updateArticleById
};