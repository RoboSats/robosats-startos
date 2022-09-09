#!/bin/bash

set -e

_term() { 
  echo "Caught SIGTERM signal!"
  kill -TERM "$rs_process" 2>/dev/null
  exit 0
}

# Setting env-vars from config page
echo "Starting RoboSats..."
./robosats-client.sh 

trap _term SIGTERM

wait -n $rs_process
