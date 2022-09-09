FROM recksato/robosats-client
RUN apt-get update && apt-get install wget curl sudo bash tini -y \
        && wget https://github.com/mikefarah/yq/releases/download/v4.25.1/yq_linux_arm.tar.gz -O - |\
        tar xz && mv yq_linux_arm /usr/bin/yq

ENV APP_HOST robosats.embassy
ENV APP_PORT 9000
ENV TOR_PROXY_IP robosats.embassy
ENV TOR_PROXY_PORT 9050

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
ADD check-web.sh /usr/local/bin/check-web.sh
RUN chmod a+x /usr/local/bin/*.sh
RUN chmod a+x *.sh

EXPOSE 12596

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]