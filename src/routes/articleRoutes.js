const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articleController');
const { validateArticle } = require('../middleware/validation');

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Gestion des articles du blog
 */

// GET /api/articles/search  (doit être AVANT /:id pour éviter le conflit de route)
router.get('/search', ctrl.searchArticles);

// GET /api/articles
router.get('/', ctrl.getAllArticles);

// POST /api/articles
router.post('/', validateArticle, ctrl.createArticle);

// GET /api/articles/:id
router.get('/:id', ctrl.getArticleById);

// PUT /api/articles/:id
router.put('/:id', ctrl.updateArticle);

// DELETE /api/articles/:id
router.delete('/:id', ctrl.deleteArticle);

module.exports = router;
