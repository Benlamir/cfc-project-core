# Comptes de Test pour le CFC

Voici les comptes de test créés pour vérifier les différents rôles et layouts de l'application.
Le mot de passe pour tous les comptes est : `password123`

## 1. Super Administrateur
Ce compte a un accès total et complet, y compris l'interface d'administration Django (`/admin`) et le layout **SuperAdminLayout**.
- **Email** : `admin@cfc.local`
- **Mot de passe** : `password123`
- **Rôle** : `SUPER_ADMIN`
- **Lien d'accès après connexion** : [http://localhost:5173/dashboard/superadmin](http://localhost:5173/dashboard/superadmin)

## 2. Coordinateur
Ce compte simule un coordinateur du Centre de Formation Continue. Il a accès au **CoordinatorLayout** pour gérer les candidatures et les formations.
- **Email** : `coordinateur@cfc.local`
- **Mot de passe** : `password123`
- **Rôle** : `COORDINATOR`
- **Lien d'accès après connexion** : [http://localhost:5173/dashboard/admin](http://localhost:5173/dashboard/admin)

## 3. Administrateur d'Établissement
Ce compte simule un administrateur d'un établissement rattaché. Bien que son interface soit similaire au coordinateur ou dépendante de vos spécifications futures, le rôle diffère.
- **Email** : `etab@cfc.local`
- **Mot de passe** : `password123`
- **Rôle** : `ETABLISSEMENT_ADMIN`
- **Lien d'accès après connexion** : [http://localhost:5173/dashboard/etablissement](http://localhost:5173/dashboard/etablissement)

## 4. Candidat
Ce compte simule un étudiant qui postule à une formation. Il mène directement au **CandidateLayout** (interface sans barre latérale).
- **Email** : `candidat@cfc.local`
- **Mot de passe** : `password123`
- **Rôle** : `CANDIDATE`
- **Lien d'accès après connexion** : [http://localhost:5173/dashboard](http://localhost:5173/dashboard)

---
*Note : Vous pouvez vous connecter à ces comptes via la page de connexion habituelle. Si vous souhaitez tester les permissions (Error 403), essayez de naviguer vers `/dashboard/admin` via le compte Candidat.*
