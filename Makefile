# Variables
COMPOSE_FILE = docker-compose.yml
COMPOSE_FILE_DEV = docker-compose.dev.yml

# Démarrer les conteneurs
docker-up:
	docker compose -f $(COMPOSE_FILE) up -d --build --remove-orphans

# Démarrer les conteneurs en mode développement
docker-up-dev:
	docker compose -f $(COMPOSE_FILE_DEV) up -d --build --remove-orphans

# Arrêter les conteneurs
docker-down:
	docker compose -f $(COMPOSE_FILE) down

# Voir les logs
docker-logs:
	docker compose -f $(COMPOSE_FILE) logs -f

# Recréer et redémarrer les conteneurs
docker-restart:
	make docker-down && make docker-up

tests:
	docker compose run -T --rm backend npm run test && docker compose run -T --rm ai pytest

