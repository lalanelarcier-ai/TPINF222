/**
 * Middleware de validation des données d'un article
 * Vérifie que titre, contenu et auteur sont présents et non vides
 */
exports.validateArticle = (req, res, next) => {
    const { titre, contenu, auteur } = req.body;
    const errors = [];

    if (!titre || typeof titre !== 'string' || titre.trim() === '') {
        errors.push('Le titre est obligatoire et ne peut pas être vide.');
    }
    if (!contenu || typeof contenu !== 'string' || contenu.trim() === '') {
        errors.push('Le contenu est obligatoire et ne peut pas être vide.');
    }
    if (!auteur || typeof auteur !== 'string' || auteur.trim() === '') {
        errors.push('Le nom de l\'auteur est obligatoire.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: errors.join(' ') });
    }

    // Nettoyer les données
    req.body.titre = titre.trim();
    req.body.contenu = contenu.trim();
    req.body.auteur = auteur.trim();

    next();
};
