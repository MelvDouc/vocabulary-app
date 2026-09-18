FROM node:24-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable
ENV CI=true
WORKDIR /app
COPY --parents --exclude=node_modules **/package.json pnpm*.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . ./
RUN pnpm run -r build
RUN pnpm deploy --filter=client --prod ./prod/client/
RUN pnpm deploy --filter=server --prod ./prod/server/

FROM builder AS server
RUN apt update && apt install -y --no-install-recommends curl
WORKDIR /app
COPY --from=builder /app/prod/server/ ./
USER node
CMD [ "node", "dist/index.js" ]

FROM nginx:stable-alpine3.23-perl AS client
COPY --from=builder /app/prod/client/dist /usr/share/nginx/html
COPY packages/client/config/nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx", "-g", "daemon off;" ]
