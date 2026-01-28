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

### Diagrammes

*   [Diagramme de Cas d'Utilisation](docs/use_case_diagram.puml)
*   [Diagramme de Classes](docs/class_diagram.puml)
*   [Diagramme de Séquence (Inscription)](docs/sequence_diagram.puml)
*   [Diagramme de Séquence (Ouverture Formation)](docs/sequence_diagram_open_course.puml)
*   [Diagramme de Séquence (Validation Dossier)](docs/sequence_diagram_validation.puml)
*   [Diagramme de Séquence (Fermeture Auto)](docs/sequence_diagram_auto_close.puml)
*   [Diagramme d'États (Cycles de Vie)](docs/state_diagrams.puml)

## Structure du Projet

Un aperçu de haut niveau de la structure du dépôt :

*   `backend/` - Code source du projet Django et définitions de l'API.
*   `frontend/` - Code source de l'application React/Vite.
*   `infra/` - Configuration DevOps (Docker, Nginx, scripts CI/CD).
*   `docs/` - Documentation du projet et diagrammes UML.

## Pour Commencer

*(Les instructions pour lancer le projet seront ajoutées une fois l'infrastructure mise en place)*