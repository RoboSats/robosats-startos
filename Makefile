PKG_ID := $(shell yq e ".id" manifest.yaml)
PKG_VERSION := $(shell yq e ".version" manifest.yaml)
TS_FILES := $(shell find ./ -name \*.ts)

# delete the target of a rule if it has changed and its recipe exits with a nonzero exit status
.DELETE_ON_ERROR:

all: verify

verify: $(PKG_ID).s9pk
	start-sdk verify s9pk $(PKG_ID).s9pk

install: $(PKG_ID).s9pk
	start-cli package install $(PKG_ID).s9pk

clean:
	rm -rf docker-images
	rm -f image.tar
	rm -f $(PKG_ID).s9pk
	rm -f scripts/*.js

# for rebuilding just the arm image. will include docker-images/x86_64.tar into the s9pk if it exists
arm: docker-images/aarch64.tar scripts/embassy.js
	start-sdk pack

# for rebuilding just the x86 image. will include docker-images/aarch64.tar into the s9pk if it exists
x86: docker-images/x86_64.tar scripts/embassy.js
	start-sdk pack

scripts/embassy.js: $(TS_FILES)
	deno run --allow-read --allow-write --allow-env --allow-net scripts/bundle.ts

docker-images/x86_64.tar: Dockerfile docker_entrypoint.sh
	mkdir -p docker-images
	docker buildx build --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --platform=linux/amd64 --build-arg PLATFORM=amd64 -o type=docker,dest=docker-images/x86_64.tar .

docker-images/aarch64.tar: Dockerfile docker_entrypoint.sh
	mkdir -p docker-images
	docker buildx build --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --platform=linux/arm64 --build-arg PLATFORM=arm64 -o type=docker,dest=docker-images/aarch64.tar .

$(PKG_ID).s9pk: manifest.yaml instructions.md LICENSE icon.png scripts/embassy.js docker-images/x86_64.tar docker-images/aarch64.tar
	start-sdk pack
