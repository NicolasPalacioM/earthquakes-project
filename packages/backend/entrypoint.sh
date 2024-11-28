#!/bin/bash

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
until nc -z -v -w30 "$DB_HOST" "$DB_PORT"
do
  echo "Waiting for database connection at $DB_HOST:$DB_PORT..."
  sleep 5
done
echo "Database is up and running!"

# Run migrations
echo "Running database migrations..."
pnpm --filter backend db:migrate

# Run seeders
echo "Running database seeders..."
pnpm --filter backend db:seed

# Start the backend server
echo "Starting the backend server..."
pnpm --filter backend start
