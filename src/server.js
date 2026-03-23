const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const articleRoutes = require('./routes/articleRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware globaux ──────────────────────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Fichiers statiques (interface web optionnelle) ──────────────────────────
app.use(express.static(path.join(__dirname, '../public')));

// ── Routes API ──────────────────────────────────────────────────────────────
app.use('/api/articles', articleRoutes);

// ── Documentation Swagger ───────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Blog API – INF222',
}));

// Route racine → redirige vers la doc
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// ── Gestion des routes inconnues ────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route introuvable.' });
});

// ── Gestion des erreurs globales ────────────────────────────────────────────
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
});

// ── Démarrage ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n[✓] Blog API démarrée sur http://localhost:${PORT}`);
    console.log(`[i] Documentation Swagger : http://localhost:${PORT}/api-docs\n`);
});

module.exports = app;
