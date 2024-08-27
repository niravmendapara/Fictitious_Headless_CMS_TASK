const fictitiousService = require('../services/fictitious-api-service');
const staticDataService = require('../services/static-data-service');

const DataService = process.env.DATA_FLOW === 'static' ? staticDataService : fictitiousService;

console.log("process.env.DATA_FLOW", process.env.DATA_FLOW);

const getAllCategories = async (req, res) => {
    try {
        const categories = await DataService.fetchAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Failed to fetch content' });
    }
};

module.exports = {
    getAllCategories,
};