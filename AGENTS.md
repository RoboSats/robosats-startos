# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

- **Keep `fallbackPort` on the Tor SOCKS lookup in `main.ts`.** Without it the resolved address changes with Tor's install state, and the `.const()` restarts RoboSats on every Tor install, update or uninstall.
- **Don't add state to the `main` volume or imply a restore recovers an identity** — the robot token lives in the browser and funds are on Lightning.
