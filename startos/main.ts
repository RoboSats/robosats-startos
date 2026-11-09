import { sdk } from './sdk'
import { i18n } from './i18n'
import { socksHostId, socksPort } from 'tor-startos/startos/utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info(i18n('Starting RoboSats!'))

  // Tor's SOCKS proxy over the LXC bridge. tor binds SOCKS at <osIp>:9050 and
  // the 9050 fallback keeps the resolved address constant, so this `.const()` never
  // restarts RoboSats on tor install/update/uninstall (only a healing restart
  // if tor's SOCKS ever landed on a different port). Split into IP and port for
  // the daemon's separate `TOR_PROXY_IP`/`TOR_PROXY_PORT` env.
  const [torIp, torPort] = (
    await sdk.host
      .getBridgeAddress(effects, {
        packageId: 'tor',
        hostId: socksHostId,
        internalPort: socksPort,
        fallbackPort: socksPort,
      })
      .const()
  ).split(':')

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'robosats' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/root',
      readonly: false,
    }),
    'robosats-sub',
  )

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      command: sdk.useEntrypoint(),
      env: {
        TOR_PROXY_IP: torIp,
        TOR_PROXY_PORT: torPort,
      },
    },
    ready: {
      display: i18n('Web Interface'),
      // The image's own HEALTHCHECK: nginx keeps a plain-HTTP probe off the TLS port.
      fn: () =>
        sdk.healthCheck.runHealthScript(
          ['wget', '-q', '-O-', 'http://127.0.0.1:8080/selfhosted'],
          subcontainer,
          {
            errorMessage: i18n('The web interface is not ready'),
            message: () => i18n('The web interface is ready'),
          },
        ),
    },
    requires: [],
  })
})
