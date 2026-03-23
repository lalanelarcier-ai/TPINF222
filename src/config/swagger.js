const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API – INF222 TAF1',
            version: '1.0.0',
            description:
                'API RESTful pour la gestion d\'articles de blog. Développée avec Node.js, Express et SQLite dans le cadre du cours INF222.',
            contact: {
                name: 'Étudiant INF222',
            },
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Serveur local' },
        ],
        components: {
            schemas: {
                Article: {
                    type: 'object',
                    required: ['titre', 'contenu', 'auteur'],
                    properties: {
                        id: { type: 'integer', example: 1, readOnly: true },
                        titre: { type: 'string', example: 'Introduction à Node.js' },
                        contenu: {
                            type: 'string',
                            example: 'Node.js est un environnement d\'exécution JavaScript côté serveur...',
                        },
                        auteur: { type: 'string', example: 'Marie Dupont' },
                        categorie: { type: 'string', example: 'Tech' },
                        tags: {
                            type: 'string',
                            example: 'nodejs,javascript,backend',
                            description: 'Tags séparés par des virgules',
                        },
                        date_creation: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-03-23T09:00:00.000Z',
                            readOnly: true,
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string', example: 'Le titre est obligatoire.' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

module.exports = swaggerJsdoc(options);
