---
title: "Rapport INF222 - Évaluation Continue 1 : TAF 1"
---

# Page de Garde

**Nom :** [VOTRE NOM]
**Prénom :** [VOTRE PRÉNOM]
**Matricule :** [VOTRE MATRICULE]
**Filière :** [VOTRE FILIÈRE]
**Unité d'Enseignement :** INF222 (Développement Backend - Programmation Web)
**Enseignant :** Charles Njiosseu, PhD Student

---

## Introduction

L'objectif de ce premier Travail À Faire (TAF 1) est de nous familiariser avec l'apprentissage structuré et personnalisé en développement web à travers la plateforme **CleeRoute**. En plus de la prise en main de cet outil qui stimule l'autonomie et l'esprit critique, ce travail pratique nous amène à concevoir et développer une première API Backend complète pour la gestion d'un blog, en mettant en œuvre les bonnes pratiques de développement, de documentation (Swagger) et de structuration du code.

---

## Partie 1 : Utilisation de la plateforme CleeRoute

*(Note : Remplacez les balises `[Insérer Capture d'écran X]` par vos propres captures d'écran réalisées sur la plateforme CleeRoute).*

### Étape 1 : Création du compte avec validation de l’adresse email
*Notes explicatives :* Je me suis rendu sur CleeRoute pour créer un nouveau compte. J'ai renseigné mes informations personnelles et validé mon adresse e-mail via le lien de confirmation reçu dans ma boîte de réception. Cela m'a permis d'accéder à l'interface principale.
**[Insérer Capture d'écran 1 : Email de validation / Tableau de bord d'accueil]**

### Étape 2 : Définition du niveau et de l’objectif
*Notes explicatives :* Dès la première connexion, j'ai dû évaluer mon niveau actuel en développement web (ex: Débutant / Intermédiaire) et j'ai défini mon objectif principal, qui est d'apprendre et de consolider mes acquis en développement Backend avec Node.js.
**[Insérer Capture d'écran 2 : Interface de choix de niveau et d'objectif]**

### Étape 3 : Paramétrage du but et du profil
*Notes explicatives :* J'ai affiné mon profil en indiquant mon rythme d'apprentissage souhaité et mes centres d'intérêt technologiques, permettant à CleeRoute d'adapter son contenu à mes attentes.
**[Insérer Capture d'écran 3 : Profil utilisateur configuré]**

### Étape 4 : Génération du parcours
*Notes explicatives :* À l'aide de l'intelligence artificielle ou de l'algorithme de CleeRoute, un parcours d'apprentissage sur-mesure a été généré, segmenté en plusieurs modules logiques pour m'amener à maîtriser Node.js et la création d'API REST.
**[Insérer Capture d'écran 4 : Plan du parcours généré]**

### Étape 5 : Suivi des modules
*Notes explicatives :* J'ai commencé à suivre les premiers modules proposés, en validant étape par étape les concepts théoriques abordés (serveurs, requêtes HTTP, routage).
**[Insérer Capture d'écran 5 : Progression d'un module en cours]**

### Étape 6 : Prise des notes
*Notes explicatives :* J'ai utilisé l'outil intégré à la plateforme (ou un outil externe organisé) pour prendre des notes sur les concepts clés, notamment la structuration d'une API et le protocole HTTP.
**[Insérer Capture d'écran 6 : Espace de prise de notes]**

### Étape 7 : Ajouter des sources et les interroger dans le chat de l’assistant
*Notes explicatives :* J'ai fourni des liens documentaires supplémentaires (par exemple la documentation officielle d'Express.js) que j'ai pu interroger via l'assistant virtuel de CleeRoute pour obtenir des éclaircissements sur la création de routes.
**[Insérer Capture d'écran 7 : Interaction avec l'assistant chat]**

### Étape 8 : Participer au Quiz pour évaluer votre compréhension du cours
*Notes explicatives :* En fin de module, j'ai répondu à un quiz interactif pour mesurer mon intégration des concepts étudiés. J'ai pu revoir mes erreurs directement après les résultats.
**[Insérer Capture d'écran 8 : Résultat du Quiz]**

---

## Partie 2 : Application Pratique – API Backend de Blog

Pour cette partie pratique, j'ai développé une API RESTful avec **Node.js, Express et SQLite** qui permet de gérer entièrement les articles d'un blog. 

### Choix Technologiques
- **Langage & Framework :** Node.js avec Express.js pour sa rapidité de mise en place et son architecture non-bloquante.
- **Base de données :** SQLite, via la librairie `better-sqlite3`, pour simplifier le déploiement sans nécessiter de base de données externe complexe.
- **Documentation :** Swagger (via `swagger-ui-express` et `swagger-jsdoc`) pour explorer et tester les endpoints facilement.

### Fonctionnalités développées et Endpoints
Mon API respecte le modèle MVC (Modèles, Contrôleurs, Routes). Voici les endpoints :

1. **Créer un article** (`POST /api/articles`) : Sauvegarde un article avec validation stricte (titre non vide, auteur obligatoire). Retourne `201 Created`.
2. **Lire / afficher les articles** (`GET /api/articles`) : Renvoie la liste des articles avec un support de filtrage via query string (`?categorie=Tech`, `?date=2026-03-23`, ou `?auteur=Nom`). Retourne `200 OK`.
3. **Lire un article unique** (`GET /api/articles/{id}`) : Récupère les détails depuis son ID. Retourne `404 Not Found` s'il n'existe pas.
4. **Modifier un article** (`PUT /api/articles/{id}`) : Met à jour les champs fournis d'un article spécifique.
5. **Supprimer un article** (`DELETE /api/articles/{id}`) : Supprime définitivement l'article de la base de données SQLite.
6. **Rechercher un article** (`GET /api/articles/search?query=texte`) : Effectue une recherche de correspondance partielle (LIKE) à la fois dans le titre et le contenu de l'article.

### Documentation et Pratiques Intégrées
- **Swagger :** Une page interactive `/api-docs` est disponible au démarrage du serveur pour tester toutes les routes.
- **Bonnes pratiques :** Validation des données entrantes, gestion globale des erreurs (`500 Internal Server Error`), utilisation de code sémantique HTTP (`200`, `201`, `400`, `404`), séparation des responsabilités.

### Livrables Techniques

- **Lien du dépôt GitHub :** [INSÉRER VOTRE LIEN GITHUB ICI]
- **Lien de déploiement (Optionnel) :** [INSÉRER VOTRE LIEN RAILWAY/RENDER ICI SI FAIT]
- *Un `README.md` détaillé contenant les instructions d'installation se trouve à la racine du dépôt.*

*(Note : Assurez-vous d'avoir poussé le dossier `blog-api` sur votre propre dépôt GitHub avant la soumission).*

---

## Partie 3 : Analyse critique de CleeRoute

### Points forts
- **Personnalisation de l'apprentissage :** L'IA adapte le contenu et le parcours aux objectifs réels de l'utilisateur, ce qui évite de suivre des formations génériques peu pertinentes.
- **Interactivité :** La présence d'un assistant conversationnel capable d'analyser des sources externes aide grandement au débogage et à la compréhension des documentations complexes.
- **Centralisation :** Avoir la théorie, la prise de notes, l'évaluation par quiz et l'assistant IA réunis sur une seule plateforme minimise les distractions.

### Points faibles
- **Dépendance à l'IA :** Les réponses de l'assistant, bien qu'utiles, peuvent parfois manquer de recul architectural par rapport aux bonnes pratiques métiers très spécifiques. Il est crucial d'avoir un esprit critique face aux solutions générées.
- **Profondeur des contenus automatisés :** Les parcours générés peuvent parfois rester en surface sur des sujets d'ingénierie avancés comparativement à des cours magistraux structurés par des professionnels.

### Améliorations possibles
- **Intégration d'un IDE :** Proposer un environnement d'exécution de code directement intégré dans le navigateur (comme Sandpack ou StackBlitz) pour tester les extraits de code sans quitter la plateforme.
- **Communauté / Peer Learning :** Ajouter une dimension sociale permettant d'interagir avec d'autres étudiants suivant le même parcours pour des révisions collaboratives.

### Utilité pour un étudiant en informatique
Pour un étudiant en informatique (notamment en développement Backend), CleeRoute est un excellent outil de **mentorat asynchrone**. Il permet d'accélérer la courbe d'apprentissage lorsqu'on découvre une nouvelle pile technologique (comme Express/Node.js). L'étudiant peut s'auto-évaluer par les quiz, et son esprit critique est sollicité lorsqu'il doit comprendre et implémenter le parcours généré.

---

## Conclusion

Ce premier travail pratique m'a permis non seulement de structurer intelligemment ma montée en compétences grâce à la plateforme CleeRoute, mais aussi de concrétiser cet apprentissage théorique. J'ai pu mettre en place de zéro une API d'articles de Blog entièrement fonctionnelle, documentée avec Swagger et respectant les normes de l'industrie (Express, codes HTTP, validations). Ce devoir souligne l'importance de combiner l'apprentissage assisté par l'IA avec une pratique solide et régulière.
