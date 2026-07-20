FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm
RUN pnpm fetch --prod
RUN pnpm install --prod --frozen-lockfile

COPY . .

RUN pnpm build

ENV NODE_ENV production

CMD ["pnpm", "start"]
