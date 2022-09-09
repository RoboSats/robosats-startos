FROM recksato/robosats-client

ENV APP_HOST "robosats.embassy"
ENV APP_PORT 9000
ENV TOR_PROXY_IP localhost
ENV TOR_PROXY_PORT 9050

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
ADD check-web.sh /usr/local/bin/check-web.sh
RUN chmod a+x /usr/local/bin/*.sh
RUN chmod a+x robosats-client.sh

EXPOSE 12596

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]