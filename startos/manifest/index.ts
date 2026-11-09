import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'robosats',
  title: 'RoboSats',
  license: 'AGPL-3.0',
  packageRepo: 'https://github.com/Start9-Community/robosats-startos',
  upstreamRepo: 'https://github.com/RoboSats/robosats',
  marketingUrl: 'https://learn.robosats.com/',
  donationUrl: 'https://learn.robosats.com/contribute/donate/',
  description: i18n.description,
  volumes: ['main'],
  images: {
    robosats: {
      source: {
        dockerTag:
          'recksato/robosats-client:v0.8.8-alpha@sha256:22efbf7d7e88b83878d9f57f7335d81c24e657b4add183af812db462ec012f15',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
