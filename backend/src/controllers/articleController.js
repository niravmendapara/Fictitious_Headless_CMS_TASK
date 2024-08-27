const fictitiousService = require('../services/fictitiousApiService');
const staticDataService = require('../services/staticDataService');

const DataService = process.env.DATA_FLOW === 'static' ? staticDataService : fictitiousService;

const getAllArticles = async (req, res) => {
    try {
        const { page = 1, limit = 10, category = null } = req.query;
        const articles = await DataService.fetchAllArticles(Number(page), Number(limit), category);
        res.status(200).json(articles);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};

const updateArticleById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const articlePayload = req.body;
        console.log("articlePayload", articlePayload);
        const article = await DataService.updateArticleById(articleId, articlePayload);
        console.log("UPDATED ARTICLES", article);
        res.status(200).json(article);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};

module.exports = {
    getAllArticles,
    updateArticleById,
};