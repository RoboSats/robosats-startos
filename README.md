<p align="center">
  <img src="icon.svg" alt="RoboSats Logo" width="21%">
</p>

# RoboSats on StartOS

> Everything not listed in this document should behave the same as upstream
> RoboSats. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[RoboSats](https://github.com/RoboSats/robosats) is a peer-to-peer Bitcoin exchange over Lightning, where trades are escrowed by a coordinator and everything happens over Tor. This package runs the **client**, not a coordinator: your own copy of the interface, connecting out to the coordinators you choose.

- **Upstream repo:** <https://github.com/RoboSats/robosats>
- **Wrapper repo:** <https://github.com/Start9-Community/robosats-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One upstream image, **pinned by digest** as well as by tag.

| Property      | Value                                     |
| ------------- | ----------------------------------------- |
| Image         | `recksato/robosats-client`, digest-pinned |
| Architectures | x86_64, aarch64                           |
| Command       | The image's own entrypoint                |

| Subcontainer   | Purpose                                  |
| -------------- | ---------------------------------------- |
| `robosats-sub` | The only daemon — the one to `attach` to |

**This is the self-hosted client image**, the one upstream publishes for people who want to run the front end themselves rather than load someone else's copy. Running it locally means the interface you trade through is served from your own server.

## Volume and Data Layout

One volume.

| Volume | Mount Point | Purpose                      |
| ------ | ----------- | ---------------------------- |
| `main` | `/root`     | Whatever the client persists |

**There is very little here.** RoboSats' client is a front end: orders, escrow, and settlement live with the coordinator and on Lightning, and your identity is a garage key you hold in the browser. Nothing on this volume is a wallet or a key.

## File Models

**None.** The package manages no configuration file. The only settings it supplies are two environment values pointing the client at Tor, and everything else — coordinators, language, appearance — is chosen inside the interface and kept by the browser.

## Dependencies

One, and it is required.

| Dependency | Required | Health checks required | Why                             |
| ---------- | -------- | ---------------------- | ------------------------------- |
| Tor        | Yes      | `tor`                  | Coordinators are onion services |

**Tor is not optional here, and that is upstream's design rather than a packaging choice.** RoboSats coordinators are reachable as onion services; without Tor the client has nowhere to connect.

**The SOCKS address is resolved with a fallback**, so it stays constant whether Tor is installed, updated, or removed. That is deliberate: installing or restarting Tor never restarts RoboSats, and it is split into an address and a port because the client takes them as two separate values.

## Network Access and Interfaces

One interface.

| Interface | Id   | Type | Port  | Description         |
| --------- | ---- | ---- | ----- | ------------------- |
| Web UI    | `ui` | ui   | 12596 | The RoboSats client |

Bound on the `ui-multi` MultiHost as HTTPS and not masked. The client terminates its own TLS on that port with a self-signed certificate, so StartOS serves the address with its own certificate and re-encrypts to the container without validating the client's — that leg never leaves the container bridge.

**There is no login.** RoboSats has no server-side account — your identity is a garage key generated in the browser — so anyone who can reach this address gets the client, and whether they get _your_ trades depends on whether they have your garage key or legacy robot token.

All outbound traffic to coordinators goes through Tor. The client makes no direct clearnet connections to them.

**A server carried over from StartOS 0.3.5** also had a host named `main`, left behind by that version's interface. The 0.8.7:2 migration retires it, freeing its port. Its addresses — a `.onion` or a domain added to it — are not moved to `ui-multi`; add one to the Web UI interface instead.

## Installation and First-Run Flow

Install does nothing: no seeding, no task, no credential.

**Tor is a required dependency** with its own health check. StartOS reports it unsatisfied until Tor is installed, running and healthy; until then the client cannot reach any coordinator.

Once running, open the interface. The client defaults to **Legacy** mode, where Start and new-order controls are disabled. For new trades, select **Garage Key**, confirm the mode change, then select **Start** and **Generate Garage Key** to create a key (`robo1…`). A fresh robot is derived from it for each trade. **Save that key**: it is the only way back to your robots and your orders, it is not stored on the server, and nobody can recover it for you. Restore an existing garage key through **Recovery** in Garage Key mode.

A robot token from before v0.8.8 still works through **Recovery** in Legacy mode, which only recovers ongoing trades. Switching modes clears both the robots and the garage key held in that browser; save existing tokens or the key before confirming a switch.

Coordinators are selected inside the interface. The client ships knowing the well-known ones and connects to whichever you pick.

## Actions

**None.** The package ships an empty action set — everything RoboSats does is configured inside its own interface.

## Tasks

None. This package raises no tasks, so the service is never held on a prompt and its ordinary controls are always available.

## Health Checks

One check, on the only daemon.

| Check     | Displayed as    | Method                                |
| --------- | --------------- | ------------------------------------- |
| `primary` | "Web Interface" | The image's own health probe succeeds |

**It runs the probe the image declares for itself** — `wget` against a plain-HTTP listener nginx keeps inside the container, off the TLS port — executed in the daemon's own container. The published port is not probed: the OS proxy is the only thing meant to speak to it.

It says nothing about coordinators. A coordinator that is down, or a Tor circuit that will not build, shows a green check and an error inside the interface.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`.

**There is nothing valuable in it.** Your garage key lives in the browser, your funds are in Lightning, and your orders are with the coordinator — a backup here restores a client, not an identity or a balance.

**Losing your garage key is not recoverable from this backup**, or from anywhere else. That is a property of RoboSats, not of the packaging.

## Limitations and Differences

1. **This is the client, not a coordinator.** It does not run an exchange; it connects to ones that do.
2. **Tor is required.** Without it there is nothing to connect to.
3. **No login and no server-side account.** Your garage key is held by your browser and is unrecoverable if lost.
4. **The backup restores nothing that matters** — no identity, no funds, no orders.
5. **No StartOS-side configuration at all** — no actions, no file models.
6. **Trades are escrowed by the coordinator you choose**, which is a trust decision made in the interface, not here.
7. **The Gumpellite coordinator (new in v0.8.8) does not work from this client.** It answers only requests addressed to `localhost`, and the client forwards the address you opened it on, so its `/api/info/` and `/api/limits/` return 400 (Django's "Bad Request (400)" page) and it shows no offers. The other coordinators are unaffected. This is on the coordinator's side, not the package's.

---

## Quick Reference for AI Consumers

```yaml
package_id: robosats
image: recksato/robosats-client # digest-pinned as well as tagged
architectures:
  - x86_64
  - aarch64
subcontainers:
  - robosats-sub
volumes:
  main: /root # very little state; no keys, no wallet
file_models: []
startos_managed_env_vars:
  - TOR_PROXY_IP # split from the resolved bridge address
  - TOR_PROXY_PORT
dependencies:
  - tor # required, kind: running, healthChecks: [tor]
interfaces:
  ui: { type: ui, port: 12596, protocol: https } # no login; the garage key lives in the browser
actions: []
tasks: []
health_checks:
  - primary # runHealthScript: the image's own wget probe of nginx's internal plain-HTTP listener
```
