<div align="center">
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Calliope.jpg/382px-Calliope.jpg" 
    alt="Calliope"
    style="width:150px; height:150px; object-fit:cover; object-position: center; border-radius:8px;" 
  />
  
  <h1>Calliope</h1>
  <p><i>Application de transcription de note audio</i></p>
  <img alt="GitHub Tag" src="https://img.shields.io/github/v/tag/Project-Calliope/calliope">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/Project-Calliope/calliope/ci-pipeline.yml">


</div>

## À propos du projet

### Contexte :
Le projet Calliope a été réalisé dans le cadre du cours **IFT785 - Approches orientées objet**. Le présent répertoire contient le fruit de notre travail de session. Ce projet avait pour objectif de renforcer nos compétences en programmation orientée objet, en utilisation de patrons de conception ainsi qu’en mise en place de tests.

### Construit avec :

| Frontend           | Backend           | API              | Base de données   | Outils & Qualité |
|--------------------|-------------------|------------------|--------------------|------------------|
| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) | ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) | ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) |
| ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) | ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  |  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)                |                      | ![ESLint](https://img.shields.io/badge/eslint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white) |
| ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) | |                  |                      | ![Pylint](https://img.shields.io/badge/pylint-4B8BBE?style=for-the-badge&logo=python&logoColor=white) |

## Utilisation

### Pre-requis

Ce projet repose entièrement sur **Docker**, **Docker Compose**, ainsi que sur des fichiers d’environnement `.env` pour fonctionner correctement.

___

#### ⚠️ Docker et Docker Compose

L’utilisation de **Docker** et **Docker Compose** est **obligatoire**. Le projet ne peut pas être lancé sans ces outils, aucune installation manuelle des dépendances n’est prévue.

Assure-toi d’avoir installé :

- [Docker](https://www.docker.com/) (version 20.x ou supérieure recommandée)
- [Docker Compose](https://docs.docker.com/compose/) (intégré à Docker Desktop ou installé séparément)

Tu peux vérifier que tout est bien installé en exécutant les commandes suivantes :

```bash
docker --version
docker compose version
```

___
#### ⚠️ Fichiers `.env`

Avant de lancer le projet, assure-toi que **tous les fichiers d’environnement sont présents** à la racine du dépôt ou dans les dossiers appropriés.

Les fichiers suivants doivent être créés à partir des fichiers exemple fournis :

- `.env` → basé sur `.env.sample` (`calliope-db`)
- `.env.dev` → basé sur `.env.dev.sample` (`calliope-backend`)
- `.env.prod` → basé sur `.env.prod.sample` (`calliope-backend`)
- `.env.test` → basé sur `.env.test.sample` (`calliope-backend`)


___

### Lancement du projet

À la racine du projet, une simple commande permet de lancer l'application en **mode production** :

```bash
make docker-up
```

---

### Développement, tests et couverture

#### 🌱 Mode développement

Pour un développement continu et interactif, le projet peut être lancé dans un environnement adapté :

```bash
make docker-up-dev
```

---

#### ✅ Exécution des tests

Pour exécuter l'ensemble des tests automatisés du projet :

```bash
make tests
```

Tu peux également exécuter les tests **de manière ciblée** selon le composant :

```bash
make tests-frontend
make tests-backend
make tests-api
```

---

#### 📊 Couverture des tests

Pour générer un rapport de couverture :

```bash
make coverage
```

Un répertoire `coverage` est créé à la racine du projet. Tu peux ensuite ouvrir le fichier `index.html` dans un navigateur pour visualiser les rapports.

---

#### 🧹 Analyse statique (Linters)

Pour analyser automatiquement le code et détecter d’éventuelles erreurs ou mauvaises pratiques :

```bash
make lint
```

Cette commande exécute :

- **ESLint** sur le frontend et le backend
- **pylint** sur l'API

Des commandes spécifiques sont également disponibles pour chaque service :

```bash
make lint-frontend
make lint-backend
make lint-api
```

---

#### ⚙️ Configuration et accès local

Une fois le projet lancé, les services sont accessibles aux adresses suivantes :

- Frontend : [http://localhost:5173](http://localhost:5173)
- Backend : [http://localhost:5000](http://localhost:5000)
- API : [http://localhost:8000](http://localhost:8000)
- Base de données : `localhost:5432`


## Contributeurs
- Gabin Granjon
- Victor Levrel
- Yann Dionisio
- Adrien Larousse

