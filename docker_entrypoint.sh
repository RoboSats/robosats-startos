#!/bin/bash

set -ea

echo "Starting RoboSats..."
exec tini ./robosats-client.sh 
