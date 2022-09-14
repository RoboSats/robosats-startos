// To utilize the default config system built, this file is required. It defines the *structure* of the configuration file. These structured options display as changeable UI elements within the "Config" section of the service details page in the Embassy UI.

import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
    "tor-address": {
        "name": "Tor Address",
        "description": "The Tor address of the network interface",
        "type": "pointer",
        "subtype": "package",
        "package-id": "robosats",
        "target": "tor-address",
        "interface": "main",
    },
    "lan-address": {
        "name": "LAN Address",
        "description": "The LAN address of the network interface",
        "type": "pointer",
        "subtype": "package",
        "package-id": "robosats",
        "target": "lan-address",
        "interface": "main",
    },
    "rs-hash": {
        "type": "string",
        "name": "Robosats Unique Token",
        "description": "This is just a place that you can store your unique token if you choose.  This is the nym identity that is randomly generated at boot for you on each startup.",
        "nullable": true,
        "copyable": true,
        "masked": false,
    }
});
