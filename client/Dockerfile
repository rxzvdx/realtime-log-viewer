# build, bundle React app w/ Vite
FROM node:20-bullseye AS build
WORKDIR /app
ARG VITE_WS_URL=ws://localhost:8080
ENV VITE_WS_URL=${VITE_WS_URL}
COPY package.json package-lock.json* ./
RUN npm ci || npm i
COPY . .
RUN npm run build

# run, serve static assets
FROM node:20-bullseye-slim
WORKDIR /app
RUN npm i -g serve@14
COPY --from=build /app/dist ./dist
EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]