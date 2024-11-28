# Use the official Node.js 18 image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the pnpm workspace files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# Copy the frontend package
COPY packages/frontend ./packages/frontend

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies including devDependencies
RUN pnpm install --filter ./packages/frontend...

# Build the frontend application
RUN pnpm --filter ./packages/frontend build

# Expose the frontend port
EXPOSE 3000

# Start the frontend application
CMD ["pnpm", "--filter", "./packages/frontend", "start"]
