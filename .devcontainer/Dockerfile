FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-18

ARG NODE_ENV=development

WORKDIR /misskey

COPY . ./

RUN apt-get update
RUN apt-get install -y build-essential ffmpeg tiny
RUN git submodule update --init
RUN yarn install --immutable
RUN yarn build

ENV NODE_ENV=development
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["yarn", "run", "migrateandstart"]
