# 📘 Documentation Technique - Projet CFC

Bienvenue dans la documentation d'architecture du projet Centre de Formation Continue.

## 1. Architecture Globale
| Diagramme | Description |
| :--- | :--- |
| **[Cas d'Utilisation](./images/use_case_diagram.png)** | Vue d'ensemble des acteurs et fonctionnalités. |
| **[Classes (Domaine)](./images/class_diagram.png)** | Structure de la base de données et relations. |

## 2. Processus Métier (Séquences)
| Scénario | Description |
| :--- | :--- |
| **[Workflow Candidature](./images/sequence_diagram.png)** | Cycle complet : Préinscription -> Dépôt -> Soumission. |
| **[Ouverture Formation](./images/sequence_diagram_open_course.png)** | (Scénario A) Action Coordinateur. |
| **[Validation Dossier](./images/sequence_diagram_validation.png)** | (Scénario C) Action Admin Établissement. |
| **[Clôture Automatique](./images/sequence_diagram_auto_close.png)** | (Scénario D) Job planifié de fermeture. |

## 3. Logique & UX
| Diagramme | Description |
| :--- | :--- |
| **[États - Transitions](./images/state_diagrams.png)** | Cycles de vie d'une Formation et d'une Inscription. |
| **[Parcours Candidat](./images/activity_diagram_candidate.png)** | Diagramme d'activité UX (Swimlanes). |

---
*Documentation générée via PlantUML.*
