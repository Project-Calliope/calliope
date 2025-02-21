# Variables
COMPOSE_FILE = docker-compose.yml

# Démarrer les conteneurs
docker-up:
	docker compose -f $(COMPOSE_FILE) up -d --build

# Arrêter les conteneurs
docker-down:
	docker compose -f $(COMPOSE_FILE) down

# Voir les logs
docker-logs:
	docker compose -f $(COMPOSE_FILE) logs -f

# Recréer et redémarrer les conteneurs
docker-restart:
	make docker-down && make docker-up

# Accéder au shell du backend
docker-backend-sh:
	docker exec -it calliope-backend sh

# Accéder au shell du client
docker-client-sh:
	docker exec -it calliope-client sh

# Accéder au shell du service AI
docker-ai-sh:
	docker exec -it calliope-ai sh
