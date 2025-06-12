Public repo to help demonstrate an issue we were seeing with reactivity when multiple version of Vue were being used 
and shared when using Module Federation.

# Setup
This repo consists of two Vue applications, a host and a remote. The host application consumes the remote application via Module Federation and has a small reactive element.

## Host

The host application is a Vue 3 application that uses the remote application as a dependency. It is set up to consume the remote's exposed components.
```bash
cd host-app
npm install
npm run serve
```

## Remote

The remote application is also Vue 3 but uses a different patch version of Vue. It exposes a component that the host application can consume
```bash
cd remote-app
npm install
npm run serve
```