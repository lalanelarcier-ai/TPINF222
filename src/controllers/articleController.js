const Article = require('../models/Article');

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string }
 *                 data: { $ref: '#/components/schemas/Article' }
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       500:
 *         description: Erreur serveur
 */
exports.createArticle = (req, res) => {
    try {
        const { titre, contenu, auteur, categorie, tags } = req.body;
        const article = Article.create({ titre, contenu, auteur, categorie, tags });
        return res.status(201).json({ success: true, message: 'Article créé avec succès.', data: article });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles (avec filtres optionnels)
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema: { type: string }
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *         description: "Filtrer par date (format: YYYY-MM-DD)"
 *       - in: query
 *         name: auteur
 *         schema: { type: string }
 *         description: Filtrer par auteur
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 count: { type: integer }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Article' }
 */
exports.getAllArticles = (req, res) => {
    try {
        const { categorie, date, auteur } = req.query;
        const articles = Article.findAll({ categorie, date, auteur });
        return res.status(200).json({ success: true, count: articles.length, data: articles });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles par mot-clé
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema: { type: string }
 *         description: Texte recherché dans titre et contenu
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *       400:
 *         description: Paramètre query manquant
 */
exports.searchArticles = (req, res) => {
    try {
        const { query } = req.query;
        if (!query || query.trim() === '') {
            return res.status(400).json({ success: false, message: 'Le paramètre "query" est obligatoire.' });
        }
        const articles = Article.search(query.trim());
        return res.status(200).json({ success: true, count: articles.length, data: articles });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Article trouvé
 *       404:
 *         description: Article introuvable
 */
exports.getArticleById = (req, res) => {
    try {
        const article = Article.findById(parseInt(req.params.id));
        if (!article) {
            return res.status(404).json({ success: false, message: `Article #${req.params.id} introuvable.` });
        }
        return res.status(200).json({ success: true, data: article });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Mettre à jour un article existant
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre: { type: string }
 *               contenu: { type: string }
 *               categorie: { type: string }
 *               tags: { type: string }
 *     responses:
 *       200:
 *         description: Article mis à jour
 *       404:
 *         description: Article introuvable
 */
exports.updateArticle = (req, res) => {
    try {
        const { titre, contenu, categorie, tags } = req.body;
        const article = Article.update(parseInt(req.params.id), { titre, contenu, categorie, tags });
        if (!article) {
            return res.status(404).json({ success: false, message: `Article #${req.params.id} introuvable.` });
        }
        return res.status(200).json({ success: true, message: 'Article mis à jour.', data: article });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Article supprimé
 *       404:
 *         description: Article introuvable
 */
exports.deleteArticle = (req, res) => {
    try {
        const deleted = Article.delete(parseInt(req.params.id));
        if (!deleted) {
            return res.status(404).json({ success: false, message: `Article #${req.params.id} introuvable.` });
        }
        return res.status(200).json({ success: true, message: `Article #${req.params.id} supprimé avec succès.` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};
