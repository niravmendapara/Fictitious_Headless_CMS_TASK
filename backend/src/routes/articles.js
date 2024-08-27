const express = require('express');
// const { getAllContent, getContentById } = require('../controllers/contentController');
const { getAllArticles, updateArticleById } = require('../controllers/articleController');

const router = express.Router();

router.get('/', getAllArticles);
router.put('/:id', updateArticleById);

module.exports = router;