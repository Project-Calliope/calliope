#!/bin/bash

set -e

# Vérifier si l'utilisateur PostgreSQL est déjà créé (pour éviter de recréer les bases à chaque redémarrage)
if [ -z "$(psql -U $POSTGRES_USER -tAc "SELECT 1 FROM pg_database WHERE datname='$POSTGRES_PROD_DB'")" ]; then
    echo "Création de la base de données $POSTGRES_PROD_DB..."
    psql -U $POSTGRES_USER -c "CREATE DATABASE $POSTGRES_PROD_DB;"
fi


if [ -z "$(psql -U $POSTGRES_USER -tAc "SELECT 1 FROM pg_database WHERE datname='$POSTGRES_TEST_DB'")" ]; then
    echo "Création de la base de données $POSTGRES_TEST_DB..."
    psql -U $POSTGRES_USER -c "CREATE DATABASE $POSTGRES_TEST_DB;"
fi

# Création des utilisateurs
echo "Création de l'utilisateur $POSTGRES_APP_USER..."
psql -U $POSTGRES_USER -c "CREATE USER $POSTGRES_APP_USER WITH PASSWORD '$POSTGRES_APP_PASSWORD';"

echo "Création de l'utilisateur $POSTGRES_DEV_USER..."
psql -U $POSTGRES_USER -c "CREATE USER $POSTGRES_DEV_USER WITH PASSWORD '$POSTGRES_DEV_PASSWORD';"

# Attribution des privilèges
echo "Attribution des privilèges pour $POSTGRES_APP_USER sur $POSTGRES_PROD_DB..."
psql -U $POSTGRES_USER -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_PROD_DB TO $POSTGRES_APP_USER;"

# Donner tous les privilèges sur le schéma public à l'utilisateur de développement
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "GRANT ALL PRIVILEGES ON SCHEMA public TO $POSTGRES_DEV_USER;"

# Donner tous les privilèges sur toutes les tables du schéma public
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $POSTGRES_DEV_USER;"

# Si de nouvelles tables sont créées, accorder également les privilèges pour ces nouvelles tables
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO $POSTGRES_DEV_USER;"



echo "Attribution des privilèges pour $POSTGRES_DEV_USER sur $POSTGRES_DB..."
psql -U $POSTGRES_USER -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_DEV_USER;"

# Exécuter le fichier schema/create-table.sql sur la base de données
echo "Exécution du script de création des tables..."
psql -U $POSTGRES_USER -d $POSTGRES_DB -f ./schemas/create_tables.sql

# Exécuter tous les fichiers SQL dans functions/
echo "Exécution des fonctions SQL..."
for file in $(find ./functions/ -type f -name "*.sql"); do
    echo "Exécution de $file..."
    psql -U $POSTGRES_USER -d $POSTGRES_DB -f "$file"
done


echo "Initialisation terminée."


echo "Base de données et utilisateurs créés avec succès."

