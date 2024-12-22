# Projet Pokédex - Guide d'installation et de développement

## Table des matières

1. Installation
2. Mise en place de la base de données
3. Mise en place de l'environnement de développement
4. Feuille de route (roadmap)
5. Routes API
6. Installation

## Installation

### Cloner le projet

```
git clone REPO_SSH_URL
```

### Se déplacer dans le projet

```
cd REPO_NAME
```

### Ouvrir le projet dans VSCode

```
code .
```

## Installer les dépendances back

```
cd back 
npm install
```


Si vous voulez utiliser npm côté front (vite etc..), cf votre repo okanban front
Sinon, utilisez liveServer tout simplement !

## Mise en place de la base de données

### Se connecter à son client Postgres

```
sudo -i -u postgres psql
```

### Créer un utilisateur de base de données

```
CREATE USER pokedex_admin WITH LOGIN PASSWORD 'pokedex';
```

### Créer une base de données

```
CREATE DATABASE pokedex WITH OWNER pokedex_admin;
```

### Quitter psql

```
exit
```

## Mise en place de l'environnement de développement

### Créer un fichier d'environnement backend

```
cp .env.example .env
```

```
code .env
```

Lancer les commandes de création de tables et d'échantillonnage
TODO: créer un script npm "db:reset" pour lancer ces commandes

```
psql -U pokedex_admin -d pokedex -f ./back/data/create_tables.sql
psql -U pokedex_admin -d pokedex -f ./back/data/seeding_tables.sql
```

## Feuille de route (roadmap)
- ⚠️ Vous êtes libre d'implémenter les fonctionnalités que vous souhaitez, de la manière dont vous souhaitez !
- ⚠️ En cas d'ambiguité sur un cas d'utilisation, la décision vous revient : choisissez ce qui vous semble pertinent.

- Vous pouvez également ne pas implémenter certaines fonctionnalités listées ici, au profit d'autres fonctionnalités qui vous semblent intéressantes.

### Version 1

|  En tant que  |	je souhaite pouvoir                        |	afin de                               |
| :------------ |:--------------------------------------------:| ----------------------------------------:|
|   visiteur    |  consulter la page des Pokémons	           |  voir la liste des Pokémons existants    |
|   visiteur	|  consulter la page d'un Pokémon	           |  consulter ses caractéristiques          |
|   visiteur	|  consulter la page récapitulative des types  |  lister les différents types existants   |
|   visiteur	|  consulter la page récapitulative d'un type  |  lister les Pokémons de ce type          |
|   visiteur	|  consulter la page de mes équipes	           |  les administrer                         |
|   visiteur	|  consulter la page d'une équipe	           |  l'administrer                           |


Attention : Les équipes ne sont pas présentes dans le script de seeding. Ajoutez-en 2 ou 3 pour les tests via le script seeding_tables.sql.

### Version 2

| En tant que   |	je souhaite pouvoir               | afin de  |
| :------------ |: --------------------------------- :| --------:|
| visiteur      |  créer une équipe                   |
| visiteur      |  modifier le nom d'une équipe       |
| visiteur      |  ajouter un Pokémon à une équipe    |
| visiteur      |  retirer un Pokémon d'une équipe    | 

### Version 3

| En tant que	| je souhaite pouvoir                   |   afin de                                             |
| :------------ |:------------------------------------ :| ---------------------------------------------------:  |
| visiteur	    |  comparer deux Pokémons               |   m'aider à faire mon choix                           |
| visiteur	    |  rechercher un Pokémon par son nom    |	le retrouver facilement via une barre de recherche  |
| visiteur      |  supprimer une équipe                 |	supprimer le groupement de Pokémons                 |
| visiteur	    |  voter pour un Pokémon                |	montrer mon intérêt pour ce Pokémon                 |
| visiteur	    |  voir le nombre de votes d'un Pokémon |	voir l'intérêt général de ce pokémon                |
| visiteur	    |  consulter le podium des Pokémons     |	voir les 10 Pokémons les plus populaires            |


### Notes :

- Dans un premier temps, n'importe quel visiteur peut voter, y compris plusieurs fois, pour le même Pokémon.
- Dans un second temps (V4), un utilisateur ne pourra voter qu'une fois par Pokémon.
  

### En complément :

- Limiter les équipes à 6 Pokémons maximum.
- Afficher une modale de confirmation lors de la suppression d'une équipe complète.
- Afficher des bulles de notification ("toast") lorsqu'une opération est réalisée avec succès.


### Version 4 - Bonus authentification

| En tant que	| je souhaite pouvoir                   |   afin de                                          |
| :------------ |:------------------------------------ :| -------------------------------------------------: |
| visiteur      |	accéder à une page d'inscription    |	me créer un compte                               |
| visiteur      |	accéder à une page de connexion	    |   me connecter et profiter des droits des membres  |



#### Droits d'un membre :

- Administrer ses propres équipes : les équipes ne sont plus communes entre les visiteurs.

- Droit de voter pour un Pokémon et de retirer son vote.

#### Non-droits d'un visiteur :

- Accéder à l'administration d'une/des équipes : il faut à présent se connecter.

#### Autres objectifs :

- Assurer l'accessibilité de l'application, y compris sur mobile.

- Assurer la sécurité de l'application face aux entrées utilisateurs.

### Version 5 - Bonus complémentaires


- Infinite scroll : Ne pas afficher tous les Pokémons dès la première consultation de la page d'accueil, mais afficher les Pokémons par groupe de 20 au fur et à mesure que l'utilisateur scroll vers le bas de la page.
  
- Dynamic search bar : À chaque keyup dans la barre de recherche de Pokémon, les Pokémons correspondants s'affichent, à la manière des moteurs de recherche, sous celle-ci.

### Routes API

#### Pokémons
| Verbe | Chemin        | Request Body | Response Body          | Code (succès) |
| ----- | ------------- | ------------ | ---------------------- | --------------- |
| GET   | /pokemons     |              | un tableau de Pokémons | 200             |
| GET   | /pokemons/:id |              | un Pokémon             | 200             |


#### Types

| Verbe | Chemin     | Request Body | Response Body       | Code (succès) |
| ----- | ---------- | ------------ | ------------------- | ----------- |
| GET   | /types     |              | un tableau de Types | 200         |
| GET   | /types/:id |              | un Type             | 200         |


#### Équipes

| Verbe  | Chemin     | Request Body           | Response Body       | Code (succès) |
| ------ | ---------- | ---------------------- | ------------------- | ------------- |
| GET    | /teams     |                        | un tableau de Teams | 200           |
| GET    | /teams/:id |                        | une Team            | 200           |
| POST   | /teams     | les données d'une team | la Team créée       | 201           |
| PATCH  | /teams/:id | les données à modifier | la Team mise à jour | 200           |
| DELETE | /teams/:id |                        |                     | 204           |

Notes :

- On ne doit pas pouvoir mettre deux fois le même Pokémon dans une même Team.
- On ne doit pas pouvoir mettre plus de 6 Pokémons dans une Team.


#### Votes

| Verbe | Chemin                | Request Body | Response Body                                               | Code (succès) |
| ----- | --------------------- | ------------ | ----------------------------------------------------------- | ------------- |
| POST  | /pokemons/:id/votes   |              | le nombre de voix actuel du Pokémon                         | 201           |
| GET   | /pokemons/leaderboard |              | les 10 Pokémons les plus populaires et leur nombre de votes | 200           |


#### Notes :

- La route POST permet d'ajouter une voix supplémentaire à un Pokémon.
- Dans un premier temps, les utilisateurs peuvent l'appeler autant de fois qu'ils le souhaitent.
- Dans un second temps, il faudrait :
   - Limiter cette route à un appel par utilisateur.
   - Offrir la possibilité à un utilisateur de retirer son vote via une route additionnelle.