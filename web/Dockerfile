FROM node:22-bookworm-slim
# see https://docs.docker.com/compose/file-watch/#prerequisites
RUN useradd -ms /bin/sh -u 1001 app
USER app

WORKDIR /app/web
EXPOSE 8001
COPY --chown=app:app ./package*.json /app/web
RUN npm install
COPY --chown=app:app ./ /app/web
CMD ["npm", "run", "dev-docker"]