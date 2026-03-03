# Centre de Formation Continue (CFC)

## 🎯 1. À quoi sert l'application ?
Le **CFC** est une plateforme web universitaire dédiée à **la gestion et la dématérialisation des programmes de formation continue**. 

Elle permet de gérer tout le cycle de vie des formations :
* **Pour les candidats (étudiants)** : Consulter le catalogue des formations, postuler en ligne (CV, motivations) et suivre l'état d'avancement de leurs dossiers.
* **Pour les coordinateurs et établissements** : Un espace d'administration pour créer des formations, jauger les candidatures, modérer les profils et visualiser des KPIs (Graphes et Statistiques).
* **Pour la super-administration** : Gérer les différentes entités universitaires (établissements), attribuer les rôles et maintenir l'architecture globale.

Ce projet de fin de module met en valeur une architecture moderne, séparée et une infrastructure conteneurisée prête à l'emploi.

---

## 🚀 2. Comment faire tourner l'application sur votre PC ?
L'application a été entièrement conteneurisée pour vous faciliter la tâche. Vous avez uniquement besoin de **Docker** (et Docker Compose) installés sur votre machine (aucun prérequis Node ou Python nécessaire en local).

1. **Lancez simplement la commande suivante** :
   ```bash
   docker compose up --build
   ```
   *(La compilation, la création de la base de données PostgreSQL, l'application des migrations Django et **la création automatique des comptes de test** se feront sous le capot !)*
2. **Accédez à l'application** dans votre navigateur :
   * **Application Principale (Côté Client/Admin)** : [http://localhost:5173](http://localhost:5173) *(Si la page ne charge pas instantanément, patientez quelques secondes que Vite finisse la première compilation).*
   * **Backend API Serveur** : [http://localhost:8000/api](http://localhost:8000/api)

> **💡 Comptes de Test (Générés Automatiquement)**  
> *Mot de passe commun pour ces 4 comptes :* `password123`
> - Super Admin : `admin@cfc.local`
> - Coordinateur : `coordinateur@cfc.local`
> - Admin Établissement : `etab@cfc.local`
> - Candidat (Étudiant) : `candidat@cfc.local`

---

## 💻 3. Technologies utilisées
*   **Backend** : Python 3.11+, Django 5.x, Django REST Framework
*   **Frontend** : TypeScript, React 19, Vite, Tailwind CSS (Lucide React, Recharts)
*   **Base de Données** : PostgreSQL 15
*   **Infrastructure / DevOps** : Docker & Docker Compose
*   **Conception & Modélisation** : PlantUML (UML diagrams)

---

## Fonctionnalités Principales Techniques Détaillées

*   **Authentification & Sécurité (RBAC)**: Système JWT complet géré par DRF avec des *Route Guards* stricts côté React pour isoler fermement les *Layouts* (Candidats, Coordinateurs, Admins d'Établissements, Super Admins).
*   **Architecture & Design Patterns**: 
    *   **Fat Models, Thin Views** : Logique métier concentrée sur le backend (Service Layer/Models). Le frontend est purement réactif ("Dumb Front").
*   **Suivi UI/UX dynamiques** : Validation des formulaires, Toast notifications, Modales dynamiques, et feedback visuel avancé lors de chargements asynchrones.

### Diagrammes UML Disponibles
Les fichiers PlantUML source ainsi que leurs rendus images se trouvent dans le dossier `docs/` :
*   [Cas d'Utilisation](docs/images/use_case_diagram.png) | [Classes](docs/images/class_diagram.png) | [États (Cycles de Vie)](docs/images/state_diagrams.png)
*   Séquences : [Inscription](docs/images/sequence_diagram.png) | [Ouverture Formation](docs/images/sequence_diagram_open_course.png) | [Validation Dossier](docs/images/sequence_diagram_validation.png) | [Fermeture Auto](docs/images/sequence_diagram_auto_close.png)
*   [Diagramme d'Activités (Parcours Candidat)](docs/images/activity_diagram_candidate.png)

## Structure du Code Source
*   `backend/` - Code source entier de l'API RESTful Django. (app `cfc_core`, `courses`, `users`).
*   `frontend/` - Code source de l'application Single Page React/TSX.
*   `docs/` - Diagrammes architecture et règles métier.