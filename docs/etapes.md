# Guide étape par étape pour le projet Pokédex

## 1. Mise en place de l'environnement de développement

- [x] Cloner le projet depuis le dépôt Git
- [x] Installer les dépendances backend
- [x] Configurer la base de données PostgreSQL
- [x] Créer et configurer le fichier .env

## 2. Création de la structure de base de données

- [x] Exécuter les scripts SQL pour créer les tables
- [x] Ajouter des données de test avec le script de seeding

## 3. Développement du backend (API)

- [x] Implémenter les routes pour les Pokémons (GET /pokemons, GET /pokemons/:id)
- [x] Implémenter les routes pour les Types (GET /types, GET /types/:id)
- [x] Développer les routes pour les Équipes (GET, POST, PATCH, DELETE)
- [ ] Créer les routes pour les votes (POST /pokemons/:id/votes, GET /pokemons/leaderboard)

## 4. Développement du frontend (Version 1)

- [x] Créer la page d'accueil avec la liste des Pokémons
- [x] Développer la page de détail d'un Pokémon
- [x] Option de triage des pokemon par type
- [x] Menu déroulant des types
- [x] Trier les pokémons par types
- [x] Développer la page des équipes et la page de détail d'une équipe

## 5. Implémentation des fonctionnalités de la Version 2

- [x] Ajouter la fonctionnalité de création d'équipe
- [ ] Permettre la modification du nom d'une équipe
- [ ] Permettre la suppression d'une équipe
- [x] Implémenter l'ajout et le retrait de Pokémons dans une équipe

## 6. Développement des fonctionnalités de la Version 3

- [ ] Créer la fonctionnalité de comparaison de deux Pokémons
- [ ] Implémenter la recherche de Pokémon par nom
- [ ] Ajouter la suppression d'équipe avec confirmation
- [ ] Développer le système de vote pour les Pokémons
- [ ] Créer la page du podium des Pokémons

## 7. Implémentation des bonus (Versions 4 et 5)

- [ ] Développer le système d'authentification (inscription et connexion)
- [ ] Gérer les droits des utilisateurs (membres vs visiteurs)
- [ ] Implémenter l'infinite scroll sur la page d'accueil
- [ ] Créer une barre de recherche dynamique

## 8. Tests et débogage

- [ ] Tester toutes les fonctionnalités
- [ ] Corriger les bugs éventuels

## 9. Optimisation et finitions

- [ ] Améliorer les performances si nécessaire
- [ ] Assurer l'accessibilité de l'application
- [ ] Renforcer la sécurité face aux entrées utilisateurs

## 10. Déploiement

- [ ] Préparer l'application pour la production
- [ ] Déployer l'application sur un serveur

> **Note** : Travaillez de manière itérative, en testant régulièrement chaque fonctionnalité au fur et à mesure de son développement. Commencez par les fonctionnalités de base (Version 1) avant de passer aux versions suivantes.