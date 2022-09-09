#!/bin/bash

set -e

# Setting env-vars from config page
echo "Setting environment variables..."
export ROBOSATS_ONION=$(yq e '.tor-address' /root/start9/config.yaml)
export LAN_HOST=$(yq e '.lan-address' /root/start9/config.yaml)
# export TOR_PROXY_IP=$(yq e '.tor-address' /root/start9/config.yaml)
client_server="npm exec http-server -- . -p 12596 -P http://127.18.0.1:9050 --cors -i false -d false"
backend_tor_bridge="socat tcp4-LISTEN:81,reuseaddr,fork,keepalive,bind=127.0.0.1 SOCKS4A:${TOR_PROXY_IP:-127.18.0.1}:${ROBOSATS_ONION:-robosats6tkf3eva7x2voqso3a5wcorsnw34jveyxfqi2fu7oyheasid.onion}:80,socksport=${TOR_PROXY_PORT:-9050}"

echo "Starting RoboSats..."
exec tini $client_server & $backend_tor_bridge & nginx -g "daemon off;"

