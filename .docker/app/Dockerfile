FROM node:12

WORKDIR /app

RUN yarn global add typescript lerna

STOPSIGNAL SIGTERM

COPY .docker/app/docker-entrypoint.sh /usr/local/bin/
RUN chmod 755 /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["yarn", "start"]
