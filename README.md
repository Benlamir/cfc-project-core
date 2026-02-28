# Centre de Formation Continue (CFC)

Une application web universitaire complète pour la gestion des programmes de formation continue. Ce projet faire office de projet de fin d'études capable de démontrer des pratiques modernes de développement web, la conteneurisation et une architecture modulaire.

## Stack Technique

*   **Backend**: Python 3.11+ (Django 5.x + Django REST Framework)
*   **Frontend**: TypeScript (React + Vite)
*   **Base de données**: PostgreSQL
*   **Infrastructure**: Docker, Docker Compose, GitHub Actions
*   **Modélisation**: PlantUML

## Architecture

Nous suivons une architecture modulaire et conteneurisée.
Modèles clés :
*   **Fat Models, Thin Views** / Couche Service si nécessaire.
*   **Contrôle d'accès basé sur les rôles (RBAC)** à travers le système.

## Fonctionnalités Principales

*   **Authentification & Inscription**: Système complet avec JWT (Login/Register).
*   **Catalogue des Formations**: Découverte des programmes avec filtres et recherche.
*   **Processus de Candidature**: Soumission en ligne (avec CV, motivations) et suivi dynamique de l'état (En attente, Accepté, Refusé).
*   **Espace Administrateur / Coordinateur**: 
    *   Tableau de bord de suivi d'activité (KPIs, Statistiques Recharts).
    *   Gestion CRUD complète du catalogue de Formations (Dates, Capacités, Statuts).
    *   Modération avancée des dossiers avec interface de visionnage PDF et filtres croisés de tri par formation.
*   **Espace Direction d'Établissement**: 
    *   Reporting analytique dédié simulant l'attractivité et la conversion des formations locales.
*   **Interface Super Administration (Globale)**:
    *   Gestion Multi-Entités (CRUD complet des Établissements avec Logos).
    *   Gestion des Comptes Utilisateurs privilégiés (Création et assignation des Admins d'Établissements, Réinitialisation des mots de passe).
    *   Configuration Globale du Système (Mise en place d'une Année Universitaire cible, Activation d'un Mode Maintenance d'urgence).
*   **Sécurité et Routage Global**:
    *   Custom JWT Claims (intégration DRF native pour l'extraction des rôles).
    *   *Route Guards* (composants React empêchant l'accès non autorisé et diffusant des `Error403`).
    *   *Role-based Layouts* (interfaces graphiques isolées entre les Candidats, Coordinateurs, Admins d'Établissements et Super Administrateurs).

### Diagrammes

*   [Diagramme de Cas d'Utilisation](docs/images/use_case_diagram.png)
*   [Diagramme de Classes](docs/images/class_diagram.png)
*   [Diagramme de Séquence (Inscription)](docs/images/sequence_diagram.png)
*   [Diagramme de Séquence (Ouverture Formation)](docs/images/sequence_diagram_open_course.png)
*   [Diagramme de Séquence (Validation Dossier)](docs/images/sequence_diagram_validation.png)
*   [Diagramme de Séquence (Fermeture Auto)](docs/images/sequence_diagram_auto_close.png)
*   [Diagramme d'États (Cycles de Vie)](docs/images/state_diagrams.png)
*   [Diagramme d'Activités (Parcours Candidat)](docs/images/activity_diagram_candidate.png)

## Structure du Projet

Un aperçu de haut niveau de la structure du dépôt :

*   `backend/` - Code source du projet Django et définitions de l'API.
    *   `cfc_core/` - Configuration principale (settings, urls).
    *   `courses/` - Gestion des établissements et des formations.
*   `frontend/` - Code source de l'application React/Vite.
*   `infra/` - Configuration DevOps (Docker, Nginx, scripts CI/CD).
*   `docs/` - Documentation du projet et diagrammes UML.

## Pour Commencer

### Prérequis
*   Docker & Docker Compose

### Lancement Rapide
1.  **Démarrer le projet** :
    ```bash
    docker compose up --build -d
    ```

2.  **Accéder aux services** :
    *   Frontend : [http://localhost:5173](http://localhost:5173)
    *   Backend API : [http://localhost:8000/api](http://localhost:8000/api)
    *   Django Admin : [http://localhost:8000/admin](http://localhost:8000/admin)

3.  **Commandes Utiles** :
    *   Créer un super-utilisateur :
        ```bash
        docker compose run --rm backend python manage.py createsuperuser
        ```
    *   Lancer les tests :
        ```bash
        docker compose run --rm backend python manage.py test
        ```