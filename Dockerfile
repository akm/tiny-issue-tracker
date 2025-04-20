FROM node:22.14.0-bookworm AS builder

RUN set -x && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /srv/uisvr
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# RUN npm ci --omit dev
RUN npm ci


FROM node:22.14.0-bookworm-slim

WORKDIR /srv/uisvr
COPY --from=builder /srv/uisvr /srv/uisvr

# https://kit.svelte.dev/docs/adapter-node
CMD ["node", "--env-file=.env", "build"]
