FROM node:22-bookworm-slim
# see https://docs.docker.com/compose/file-watch/#prerequisites
RUN useradd -ms /bin/sh -u 1001 app
USER app

WORKDIR /app/bot
COPY --chown=app:bot ./package*.json /app/bot
RUN npm install
COPY --chown=app:bot ./ /app/bot
CMD ["npm", "run", "start"]