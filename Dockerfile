#
## Copy stage
#
FROM alpine:3 AS copy
COPY . /home/app

#
## Build stage
#
FROM node:18 AS build
COPY --from=copy /home/app /home/build/app
ARG ENVIRONMET=local
WORKDIR /home/build/app
RUN yarn && yarn deploy-${ENVIRONMET}

#
##
#
FROM node:18-slim AS deploy
COPY --from=build /home/build/app/deploy /home/deploy
EXPOSE 8080
WORKDIR /home/deploy
ENTRYPOINT ["node", "backend/main.js"]