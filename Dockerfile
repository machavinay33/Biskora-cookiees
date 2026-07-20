FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@10.4.1

COPY package.json ./

RUN pnpm install --no-frozen-lockfile

COPY . .

RUN pnpm build

ENV NODE_ENV=production

CMD ["pnpm", "start"]
