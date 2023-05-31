# Wrapper for RoboSats
RoboSats is a simple and private bitcoin exchange

## Dependencies
- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [deno](https://deno.land/)
- [make](https://www.gnu.org/software/make/)
- [embassy-sdk](https://github.com/Start9Labs/start-os/tree/master/backend)

## Build enviroment
Prepare your StartOS build enviroment. In this example we are using Ubuntu 20.04.

1. Install docker
```
curl -fsSL https://get.docker.com -o- | bash
sudo usermod -aG docker "$USER"
exec sudo su -l $USER
```
2. Set buildx as the default builder
```
docker buildx install
docker buildx create --use
```
3. Enable cross-arch emulated builds in docker
```
docker run --privileged --rm linuxkit/binfmt:v0.8
```
4. Install yq
```
wget https://github.com/mikefarah/yq/releases/download/${VERSION}/${BINARY}.tar.gz -O - |\
  tar xz && mv ${BINARY} /usr/bin/yq
```
5. Install deno
```
cargo install deno
```
6. Install essentials build packages
```
sudo apt-get install -y build-essential openssl libssl-dev libc6-dev clang libclang-dev ca-certificates
```
7. Install Rust
```
curl https://sh.rustup.rs -sSf | sh
# Choose nr 1 (default install)
source $HOME/.cargo/env
```
8. Build and install embassy-sdk
```
cd ~/ && git clone --recursive https://github.com/Start9Labs/start-os.git
cd start-os/backend/
./install-sdk.sh
embassy-sdk init
```
Now you are ready to build your **robosats** service

## Cloning
Clone the project locally. 

```
git clone https://github.com/kn0wmad/robosats-wrapper.git
cd robosats-wrapper
```

## Building
To build the service, run the following command:

```
make
```

## Installing (on Start9 servers)
Run the following commands to determine successful install:
> :information_source: Change <SERVER-NAME>.local to your Start9 server address

```
embassy-cli auth login
#Enter your Start9 server master password
embassy-cli --host https://<SERVER-NAME>.local package install robosats.s9pk
```
**Tip:** You can also install the robosats.s9pk using **Sideload Service** under the **System > Settings** section.
## Verify Install
Go to your Start9 server's Services page, select RoboSats, configure and start the service.

**Done!** 
