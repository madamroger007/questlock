FROM node:22-alpine

WORKDIR /app

RUN corepack enable

# Copy only workspace files for dependency resolution
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install dependencies (creates symlinks inside container, not on host)
RUN pnpm install --frozen-lockfile

# Copy only the source code (not node_modules which have broken symlinks on Windows)
COPY apps/backend/src ./apps/backend/src
COPY apps/backend/tsconfig.json ./apps/backend/

WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["pnpm", "dev"]
