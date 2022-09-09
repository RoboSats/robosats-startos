#!/bin/bash

set -ea

echo "Starting RoboSats..."
exec tini -s ./robosats-client.sh 
