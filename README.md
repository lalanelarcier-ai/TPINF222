# Blog API – INF222 TAF1

API RESTful de gestion d'articles de blog développée avec **Node.js**, **Express** et **SQLite**.

## Stack Technique

| Outil | Rôle |
|---|---|
| Node.js + Express | Serveur HTTP & routage |
| better-sqlite3 | Base de données SQLite (sans serveur externe) |
| swagger-jsdoc + swagger-ui-express | Documentation interactive de l'API |
| cors | Support cross-origin |
| morgan | Logging des requêtes HTTP |

## Installation

```bash
# 1. Cloner le dépôt
git clone <url-du-repo>
cd blog-api

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur
npm start
```

Le serveur démarre sur **http://localhost:3000**

## Documentation Swagger

Accéder à la documentation interactive : **http://localhost:3000/api-docs**

## Interface Web (optionnel)

Une interface web est disponible sur : **http://localhost:3000**

## Endpoints

| Méthode | Endpoint | Description |
|---|---|---|
| `POST` | `/api/articles` | Créer un article |
| `GET` | `/api/articles` | Lister tous les articles |
| `GET` | `/api/articles?categorie=Tech&date=2026-03-23` | Filtrer par catégorie / date |
| `GET` | `/api/articles/:id` | Récupérer un article par ID |
| `PUT` | `/api/articles/:id` | Modifier un article |
| `DELETE` | `/api/articles/:id` | Supprimer un article |
| `GET` | `/api/articles/search?query=texte` | Rechercher des articles |

## Structure du Projet

```
blog-api/
├── src/
│   ├── config/
│   │   ├── database.js      # Connexion SQLite & schéma
│   │   └── swagger.js       # Configuration OpenAPI 3.0
│   ├── models/
│   │   └── Article.js       # Modèle avec toutes les requêtes SQL
│   ├── controllers/
│   │   └── articleController.js  # Logique métier + annotations Swagger
│   ├── routes/
│   │   └── articleRoutes.js # Définition des routes Express
│   ├── middleware/
│   │   └── validation.js    # Validation des entrées utilisateur
│   └── server.js            # Point d'entrée de l'application
├── public/
│   └── index.html           # Interface web (SPA)
├── blog.db                  # Base de données SQLite (auto-créée)
├── package.json
└── README.md
```

## Modèle de Données – Article

```json
{
  "id": 1,
  "titre": "Introduction à Node.js",
  "contenu": "Node.js est un environnement d'exécution...",
  "auteur": "Marie Dupont",
  "categorie": "Tech",
  "tags": "nodejs,javascript,backend",
  "date_creation": "2026-03-23T09:00:00.000Z"
}
```

## Exemples d'Utilisation

### Créer un article
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement d'\''exécution JavaScript côté serveur.",
    "auteur": "Marie Dupont",
    "categorie": "Tech",
    "tags": "nodejs,javascript"
  }'
```

**Réponse (201):**
```json
{
  "success": true,
  "message": "Article créé avec succès.",
  "data": { "id": 1, "titre": "Introduction à Node.js", ... }
}
```

### Lire tous les articles
```bash
curl http://localhost:3000/api/articles
```

### Filtrer par catégorie et date
```bash
curl "http://localhost:3000/api/articles?categorie=Tech&date=2026-03-23"
```

### Rechercher
```bash
curl "http://localhost:3000/api/articles/search?query=javascript"
```

### Modifier un article
```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{"titre": "Nouveau titre", "categorie": "Dev"}'
```

### Supprimer un article
```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

## Codes HTTP Utilisés

| Code | Signification |
|---|---|
| `200` | Succès |
| `201` | Création réussie |
| `400` | Requête invalide (Bad Request) |
| `404` | Article introuvable (Not Found) |
| `500` | Erreur interne du serveur |

## Bonnes Pratiques Appliquées

- [x] Validation des entrées (titre, contenu, auteur obligatoires)
- [x] Requêtes SQL paramétrées (protection injection SQL)
- [x] Séparation Modèles / Contrôleurs / Routes
- [x] Codes HTTP sémantiques
- [x] Documentation auto-générée via Swagger
- [x] Gestion centralisée des erreurs
