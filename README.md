# Calliope Project 

## Docker Setup

Ce projet utilise Docker pour exécuter trois services :
- **Backend** : Express.js (Node.js)
- **Frontend** : React (Vite)
- **AI Service** : Flask (Python)

### 🚀 Installation et exécution

#### Prérequis
- Docker et Docker Compose installés sur votre machine.

#### Démarrer les services
```sh
make docker-up
```

#### Démarrer les servives en mode développement
```sh
make docker-up-dev
```
Permet de démarrer le backend en hot-relaod

#### Arrêter les services
```sh
make docker-down
```
#### Redémarrer les services

```sh
make docker-restart
```
#### Voir les logs

```sh
make docker-logs
```

#### Accéder aux conteneurs

    Backend : make docker-backend-sh
    Frontend : make docker-client-sh
    AI Service : make docker-ai-sh

#### 📌 Configuration

    Le frontend est accessible sur : http://localhost:5173
    L'API backend est sur : http://localhost:3000
    Le service AI est sur : http://localhost:8000

#### 🛠 Développement

Si vous modifiez le code, reconstruisez les conteneurs :

```sh
make docker-restart
```



