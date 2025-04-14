# Variables
COMPOSE_FILE = docker-compose.yml
COMPOSE_FILE_DEV = docker-compose.dev.yml
COMPOSE_FILE_TEST = docker-compose.test.yml
TEST_DB_VOLUME = calliope_calliope-db-test

# Tools
DC = docker compose


# Intermediate targets

# Démarrer les services de test : Cette cible démarre les services de test définis dans le fichier docker-compose.test.yml.
ensure-services-test:
	@echo "🧪 Démarrage des services de test avec $(COMPOSE_FILE_TEST)..."
	@docker compose -f $(COMPOSE_FILE_TEST) ps | grep 'Up' > /dev/null || \
	docker compose -f $(COMPOSE_FILE_TEST) up -d --remove-orphans

# Démarrer les services de développement : Cette cible démarre les services de développement définis dans le fichier docker-compose.dev.yml.
ensure-services:
	@echo "🔧 Démarrage des services de développement avec $(COMPOSE_FILE_DEV)..."
	@docker compose -f $(COMPOSE_FILE_DEV) ps | grep 'Up' > /dev/null || \
	docker compose -f $(COMPOSE_FILE_DEV) up -d --remove-orphans

# Enleve le conteneur de la base de données de test : Cette cible supprime le conteneur de la base de données de test.
clean-db-test-volumes:
	@echo "🧹 Nettoyage des volumes de la base de données de test..."
	@docker volume rm $(TEST_DB_VOLUME) || true


# ======== DOCKER ========

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

# ==================

# ======== QA ========

# Testsmake 

tests: 
	make docker-down
	@make clean-db-test-volumes || true
	@echo "🧪 Démarrage des services de test avec $(COMPOSE_FILE_TEST)..."
	docker compose -f $(COMPOSE_FILE_TEST) up -d --build --remove-orphans 
	@echo "🚀 Lancement des tests..."
	docker compose -f $(COMPOSE_FILE_TEST) run -T --rm backend npm run test && \
	docker compose -f $(COMPOSE_FILE_TEST) run -T --rm ai pytest && \
	docker compose -f $(COMPOSE_FILE_TEST) run -T --rm client npm run test
	@docker compose -f $(COMPOSE_FILE_TEST) down || true
	@make clean-db-test-volumes || true


tests-frontend: ensure-services-test
	@echo "🎯 Test client uniquement..."
	(docker compose -f $(COMPOSE_FILE_TEST) run -T --rm client npm run test) || true
	docker compose -f $(COMPOSE_FILE_TEST) down
	@make clean-db-test-volumes

tests-backend: ensure-services-test
	@echo "🎯 Test backend uniquement..."
	(docker compose -f $(COMPOSE_FILE_TEST) run -T --rm backend npm run test) || true
	docker compose -f $(COMPOSE_FILE_TEST) down
	@make clean-db-test-volumes

tests-api: ensure-services-test
	@echo "🎯 Test API uniquement..."
	(docker compose -f $(COMPOSE_FILE_TEST) run -T --rm ai pytest) || true
	docker compose -f $(COMPOSE_FILE_TEST) down
	@make clean-db-test-volumes

# Linting

lint: ensure-services
	@echo "🔍 Linting..."
	docker compose exec -T backend npm run lint:fix
	docker compose exec -T client npm run lint:fix
	docker compose exec -T ai sh -c "black . && pylint --fail-under=6.0 ."

lint-frontend: ensure-services
	@echo "🔍 Linting client..."
	docker compose exec -T client npm run lint:fix

lint-backend: ensure-services
	@echo "🔍 Linting backend..."
	docker compose exec -T backend npm run lint:fix

lint-api: ensure-services
	@echo "🔍 Linting API..."
	docker compose exec -T ai sh -c "black . && pylint --fail-under=6.0 ."

# Format

format: ensure-services
	@echo "🛠️ Formatting..."
	docker compose exec -T ai black .
	docker compose exec -T backend npm run format
	docker compose exec -T client npm run format


# Coverage

coverage:
	make docker-down
	@make clean-db-test-volumes || true
	@echo "🧪 Démarrage des services de test avec $(COMPOSE_FILE_TEST)..."
	docker compose -f $(COMPOSE_FILE_TEST) up -d --build --remove-orphans 
	@echo "📊 Génération des rapports de couverture..."
	docker compose -f $(COMPOSE_FILE_TEST) run -T --rm backend npm run coverage || true
	docker compose -f $(COMPOSE_FILE_TEST) run -T --rm client npm run coverage || true
	docker compose -f $(COMPOSE_FILE_TEST) run -T --rm ai pytest --cov=./service --cov=./api --cov=./app.py --cov-report=html:coverage/
	docker compose -f $(COMPOSE_FILE_TEST) down || true
	@make clean-db-test-volumes || true
	@make generate-index || true
	@echo "📊 Rapport de couverture généré dans le répertoire coverage/"

coverage-backend: ensure-services-test
	@echo "📊 Génération du rapport de couverture pour le backend..."
	docker compose exec -T backend npm run coverage
	@echo "📊 Rapport de couverture généré dans le répertoire calliope-backend/coverage/"

coverage-frontend: ensure-services-test
	@echo "📊 Génération du rapport de couverture pour le client..."
	docker compose exec -T client npm run coverage
	@echo "📊 Rapport de couverture généré dans le répertoire calliope-client/coverage/"

coverage-api: ensure-services-test
	@echo "📊 Génération du rapport de couverture pour l'API..."
	docker compose exec -T ai pytest --cov=./calliope_ai --cov-report=html:coverage/"
	@echo "📊 Rapport de couverture généré dans le répertoire calliope-ai/coverage/"

# Générer un index HTML pour les rapports de couverture
generate-index:
	mkdir -p coverage
	@echo "<html><head><title>Coverage Report</title></head><body>" > coverage/index.html
	@echo "<h1>Rapports de couverture</h1><ul>" >> coverage/index.html
	@echo "<li><a href=\"../calliope-backend/coverage/lcov-report/index.html\">Backend Node.js</a></li>" >> coverage/index.html
	@echo "<li><a href=\"../calliope-client/coverage/index.html\">Frontend React</a></li>" >> coverage/index.html
	@echo "<li><a href=\"../calliope_ai/coverage/index.html\">API Python FastAPI</a></li>" >> coverage/index.html
	@echo "</ul></body></html>" >> coverage/index.html


pre-push:
	make lint
	make tests