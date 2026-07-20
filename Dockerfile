FROM node:20-alpine

WORKDIR /app

# Enable corepack to use the exact pnpm version from package.json
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (dev + prod) needed for the build
RUN pnpm install

COPY . .

RUN pnpm build

ENV NODE_ENV=production

CMD ["pnpm", "start"]
