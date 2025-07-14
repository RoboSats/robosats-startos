FROM recksato/robosats-client:v0.8.0-alpha
RUN apk add bash curl sudo tini wget yq; \
    rm -f /var/cache/apk/*

ENV APP_HOST=robosats.embassy
ENV APP_PORT=12596
ENV TOR_PROXY_IP=embassy
ENV TOR_PROXY_PORT=9050

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/*.sh
RUN chmod a+x *.sh

