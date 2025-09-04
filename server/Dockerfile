# build, compile TypeScript to JS in /dist
FROM node:20-bullseye AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm i
COPY src ./src
COPY tsconfig.json ./tsconfig.json
RUN npm run build

# run, smaller image with only runtime deps and built files 
FROM node:20-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/dist ./dist
COPY package.json ./package.json
RUN npm i ws@8.18.0 --no-audit --no-fund
EXPOSE 8080
CMD ["node", "dist/index.js"]