# Use the official Node.js 18 image
FROM node:18

# Install Netcat for the wait script
RUN apt-get update && apt-get install -y netcat-openbsd

# Set the working directory
WORKDIR /usr/src/app

# Copy the entire monorepo into the Docker image
COPY . .

# Copy the entrypoint script into the Docker image
COPY packages/backend/entrypoint.sh ./packages/backend/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x ./packages/backend/entrypoint.sh

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies in the monorepo
RUN pnpm install

# Build the backend application
RUN pnpm --filter backend build

# Expose the backend port
EXPOSE 4000

# Set the entrypoint
ENTRYPOINT ["./packages/backend/entrypoint.sh"]
