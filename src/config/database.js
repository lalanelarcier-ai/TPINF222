const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../blog.db');

let db;

function getDb() {
    if (!db) {
        db = new Database(DB_PATH);
        db.pragma('journal_mode = WAL');
        initializeSchema(db);
    }
    return db;
}

function initializeSchema(db) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      titre       TEXT    NOT NULL,
      contenu     TEXT    NOT NULL,
      auteur      TEXT    NOT NULL,
      categorie   TEXT    DEFAULT '',
      tags        TEXT    DEFAULT '',
      date_creation TEXT  NOT NULL
    );
  `);
}

module.exports = { getDb };
