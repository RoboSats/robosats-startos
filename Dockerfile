FROM recksato/robosats-client:v0.3.2-alpha
RUN apt-get update && apt-get install wget curl sudo bash tini -y
RUN wget https://github.com/mikefarah/yq/releases/download/v4.6.3/yq_linux_amd64.tar.gz -O - |\
      tar xz && mv yq_linux_amd64 /usr/bin/yq

ENV APP_HOST robosats.embassy
ENV APP_PORT 12596
ENV TOR_PROXY_IP embassy
ENV TOR_PROXY_PORT 9050

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/*.sh
RUN chmod a+x *.sh
