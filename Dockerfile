FROM recksato/robosats-client@sha256:7718b0b5ae46d5d6acb06d36fc65025d3b8e04790a6c12ac9555a03d47482ca2
RUN apt-get update && apt-get install wget curl sudo bash tini -y
RUN wget https://github.com/mikefarah/yq/releases/download/v4.6.3/yq_linux_amd64.tar.gz -O - |\
      tar xz && mv yq_linux_amd64 /usr/bin/yq

ENV APP_HOST robosats.embassy
ENV APP_PORT 12596
ENV TOR_PROXY_IP embassy
ENV TOR_PROXY_PORT 9050

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
ADD check-web.sh /usr/local/bin/check-web.sh
RUN chmod a+x /usr/local/bin/*.sh
RUN chmod a+x *.sh
