# Variables
COMPOSE_FILE = docker-compose.yml
COMPOSE_FILE_DEV = docker-compose.dev.yml
COMPOSE_FILE_TEST = docker-compose.test.yml

# Démarrer les conteneurs
docker-up:
	docker compose -f $(COMPOSE_FILE) up -d --build --remove-orphans

# Démarrer les conteneurs en mode développement
docker-up-dev:
	docker compose -f $(COMPOSE_FILE_DEV) up -d --build --remove-orphans 

# Arrêter les conteneurs
docker-down:
	docker compose -f $(COMPOSE_FILE) down --remove-orphans

# Voir les logs
docker-logs:
	docker compose -f $(COMPOSE_FILE) logs -f

# Recréer et redémarrer les conteneurs
docker-restart:
	make docker-down && make docker-up

docker-remove-volumes:
	docker compose -f $(COMPOSE_FILE) down --remove-orphans --volumes

tests:
	docker compose -f $(COMPOSE_FILE_TEST) up -d --build --remove-orphans
	docker compose -f $(COMPOSE_FILE_TEST) run -T --rm backend npm run test && docker compose -f $(COMPOSE_FILE_TEST) run -T --rm ai pytest && docker compose -f $(COMPOSE_FILE_TEST) run -T --rm client npm run test
	docker compose down --remove-orphans
	docker volume rm calliope_calliope-db-test
tests-client:
	docker volume rm calliope_calliope-db-test
	docker compose -f $(COMPOSE_FILE_TEST) up -d --build --remove-orphans
	docker compose run -T --rm client npm run test
	docker compose down --remove-orphans

lint:
	docker compose exec -T backend npm run lint:fix
	docker compose exec -T client npm run lint:fix
	docker compose exec -T ai sh -c "black . && pylint --fail-under=6.0 ."

format:
	docker compose exec -T ai black .
	docker compose exec -T backend npm run format
	docker compose exec -T client npm run format

pre-push:
	make lint
	make tests