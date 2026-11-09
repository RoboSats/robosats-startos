# RoboSats

## Documentation

- [RoboSats upstream repository](https://github.com/RoboSats/robosats) — the upstream project source and README.

## What you get on StartOS

- The **self-hosted RoboSats client** exposed as the **Web UI** interface — your private front-end to the RoboSats P2P Bitcoin exchange network.
- All coordinator traffic is routed through Tor automatically; you do not configure a SOCKS proxy yourself.
- Your garage key and client settings stay in your browser. StartOS backups do not include your garage key; save it separately.

This package runs the **client**, not a coordinator. Trades clear against the public RoboSats coordinators you select inside the web UI.

## Getting set up

1. Install [Tor](https://github.com/Start9Labs/tor-startos) first — it is a required dependency for routing RoboSats traffic.
2. Start RoboSats and open the **Web UI** interface.
3. The client initially opens in **Legacy** mode, where new-order controls are disabled. For new trades, select **Garage Key** and confirm the mode change. Switching modes clears the robots and garage key saved in that browser, so save any existing tokens or key first.
4. Select **Start**, then **Generate Garage Key**. Save the key (it starts with `robo1`) somewhere safe — it is your identity, and a fresh robot is made from it for each trade. Anyone with the key can act as you; losing it means losing access to any active orders and to your reputation. To restore an existing garage key, use **Recovery** in Garage Key mode instead.

If you have a robot token from an older version, use **Recovery** in **Legacy** mode to recover an ongoing trade. Save that token before switching to Garage Key mode for new orders.

## Using RoboSats

### Web UI

Open the **Web UI** interface to access the full client. From there you can:

- Generate or restore your identity using a garage key (or a legacy robot token).
- Pick a coordinator from the order book.
- Create or take orders, paying and receiving sats over Lightning using an external Lightning wallet.

You will need an external Lightning wallet to fund escrow and to receive payouts — RoboSats does not custody funds and does not run a wallet for you.
