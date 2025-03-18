#!/bin/bash
set -e  # Arrêter le script si une commande échoue


echo "Initializing Calliope database in development environment..."

echo "Creating database $POSTGRES_PROD_DB..."
createdb -U $POSTGRES_USER $POSTGRES_PROD_DB

echo "Creating Calliope App user $POSTGRES_APP_USER..."
psql -U $POSTGRES_USER -d postgres -c "CREATE USER $POSTGRES_APP_USER WITH PASSWORD '$POSTGRES_APP_PASSWORD';"

echo "Granting privileges to user $POSTGRES_APP_USER on database $POSTGRES_PROD_DB..."
psql -U $POSTGRES_USER -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_PROD_DB TO $POSTGRES_APP_USER;"

echo "Creating database $POSTGRES_TEST_DB..."
createdb -U $POSTGRES_USER $POSTGRES_TEST_DB

echo "Creating Calliope Dev user $POSTGRES_DEV_USER..."
psql -U $POSTGRES_USER -d postgres -c "CREATE USER $POSTGRES_DEV_USER WITH PASSWORD '$POSTGRES_DEV_PASSWORD';"

echo "Granting privileges to user $POSTGRES_DEV_USER on database $POSTGRES_DB..."
psql -U $POSTGRES_USER -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_DEV_USER;"

echo "Granting privileges to user $POSTGRES_DEV_USER on database $POSTGRES_TEST_DB..."
psql -U $POSTGRES_USER -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_TEST_DB TO $POSTGRES_DEV_USER;"

echo "Database initialization complete."
