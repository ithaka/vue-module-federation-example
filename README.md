Public repo to help demonstrate an issue we were seeing with reactivity when multiple version of Vue were being used 
and shared when using Module Federation.

# Setup
This repo consists of three Vue applications, a host and two remotes. The host application consumes the remote applications via Module Federation.

## Host

The host application is a Vue 3 application that uses the remote application as a dependency. It is set up to consume the remote's exposed components.
```bash
cd host-app
npm install
npm run serve
```

## Remotes

The remote applications is also Vue 3 but remote-app-1 is on Vue 3.4.x and remote-app-2 is on Vue 3.5.x.
```bash
cd remote-app-1
npm install
npm run serve
```

```bash
cd remote-app-2
npm install
npm run serve
```

## Demonstrating the issue and workarounds
The primary issue is that MFE fails to render the response from the GraphQL query when the remote applications 
are using different versions of Vue. This can be seen by the "Country" response for Vue MFE 1 being blank, 
when it should be showing data for Switzerland.

### Workaround 1 - Match Vue Versions
A first workaround is to change the package.json of remote-app-1 to use the same version of Vue as remote-app-2, 3.5.x.
After making this change, the remote-app-1 will render the response correctly.

### Workaround 2 - Remove one of the remotes
Remove remote-app-2 from being mounted in `App.vue` of the host application and remote-app-1 will render the response correctly.

### Workaround 3 - Stop sharing modules
To stop sharing modules, you can modify the `webpack.config.js` of either remote application to not share dependencies.
Once doing this, each remote will use its own version of Vue and the response will render correctly.