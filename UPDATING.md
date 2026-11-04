# Updating the upstream version

RoboSats ships the prebuilt `recksato/robosats-client` image directly — the package does not build its own client. Upstream tags carry an `-alpha` suffix (e.g. `v0.8.7-alpha`).

## Determining the upstream version

Go by the GitHub **release**, not the Docker Hub tag list. Docker Hub carries tags upstream never released, so "newest tag on Docker Hub" is not a reliable signal.

```
gh release view -R RoboSats/robosats --json tagName -q .tagName
```

Then confirm the matching client image exists on [`recksato/robosats-client`](https://hub.docker.com/r/recksato/robosats-client) and read its manifest-list digest (the top-level `digest` field, which covers both architectures):

```
curl -fsSL "https://hub.docker.com/v2/repositories/recksato/robosats-client/tags/v<version>-alpha" | jq -r .digest
```

## Applying the bump

Set `images.robosats.source.dockerTag` in `startos/manifest/index.ts` to `recksato/robosats-client:v<version>-alpha@sha256:<digest>`. That is the only place the image is named.

**Keep the `@sha256:` digest.** Upstream has force-moved tags in the past — the same tag string can silently yield a different client over time. The digest is the manifest list (covers both `x86_64` and `aarch64`); pinning it makes a rebuild reproduce exactly the client that was tested.
