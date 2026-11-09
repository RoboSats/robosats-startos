import { sdk } from './sdk'
import { port } from './utils'
import { i18n } from './i18n'

// Host id (the `sdk.MultiHost.of` group) — distinct from the interface id exported on it.
export const uiHostId = 'ui-multi'
export const uiInterfaceId = 'ui'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, uiHostId)
  // RoboSats serves its own TLS on `port`, with a self-signed cert.
  const uiMultiOrigin = await uiMulti.bindPort(port, {
    protocol: 'https',
    addSsl: { upstreamCertValidation: 'disable' },
  })
  const ui = sdk.createInterface(effects, {
    name: i18n('Web UI'),
    id: uiInterfaceId,
    description: i18n('The web interface of RoboSats'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const uiReceipt = await uiMultiOrigin.export([ui])

  return [uiReceipt]
})
