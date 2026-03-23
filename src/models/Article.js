const { getDb } = require('../config/database');

class Article {
    /**
     * Crée un nouvel article
     */
    static create({ titre, contenu, auteur, categorie = '', tags = '' }) {
        const db = getDb();
        const date_creation = new Date().toISOString();
        const stmt = db.prepare(
            `INSERT INTO articles (titre, contenu, auteur, categorie, tags, date_creation)
       VALUES (?, ?, ?, ?, ?, ?)`
        );
        const result = stmt.run(titre, contenu, auteur, categorie, tags, date_creation);
        return Article.findById(result.lastInsertRowid);
    }

    /**
     * Récupère tous les articles (avec filtres optionnels)
     */
    static findAll({ categorie, date, auteur } = {}) {
        const db = getDb();
        let sql = 'SELECT * FROM articles WHERE 1=1';
        const params = [];

        if (categorie) {
            sql += ' AND LOWER(categorie) = LOWER(?)';
            params.push(categorie);
        }
        if (date) {
            sql += ' AND date_creation LIKE ?';
            params.push(`${date}%`);
        }

        if (auteur) {
            sql += ' AND LOWER(auteur) = LOWER(?)';
            params.push(auteur);
        }

        sql += ' ORDER BY date_creation DESC';
        return db.prepare(sql).all(...params);
    }

    /**
     * Récupère un article par son ID
     */
    static findById(id) {
        const db = getDb();
        return db.prepare('SELECT * FROM articles WHERE id = ?').get(id) || null;
    }

    /**
     * Met à jour un article
     */
    static update(id, { titre, contenu, categorie, tags }) {
        const db = getDb();
        const existing = Article.findById(id);
        if (!existing) return null;

        const updated = {
            titre: titre !== undefined ? titre : existing.titre,
            contenu: contenu !== undefined ? contenu : existing.contenu,
            categorie: categorie !== undefined ? categorie : existing.categorie,
            tags: tags !== undefined ? tags : existing.tags,
        };

        db.prepare(
            `UPDATE articles SET titre=?, contenu=?, categorie=?, tags=? WHERE id=?`
        ).run(updated.titre, updated.contenu, updated.categorie, updated.tags, id);

        return Article.findById(id);
    }

    /**
     * Supprime un article
     */
    static delete(id) {
        const db = getDb();
        const existing = Article.findById(id);
        if (!existing) return false;
        db.prepare('DELETE FROM articles WHERE id = ?').run(id);
        return true;
    }

    /**
     * Recherche dans titre et contenu
     */
    static search(query) {
        const db = getDb();
        const like = `%${query}%`;
        return db
            .prepare(
                `SELECT * FROM articles
         WHERE titre LIKE ? OR contenu LIKE ?
         ORDER BY date_creation DESC`
            )
            .all(like, like);
    }
}

module.exports = Article;
