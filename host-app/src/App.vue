<template>
  <div>
    <h1>Host App</h1>

    <div>
      Vue version from package.json: <strong>{{ vueVersion }}</strong><br />
      Vue version from Vue: <strong>{{ version }}</strong>
    </div>

    <div ref="remoteMountPoint1"/>
    <div ref="remoteMountPoint2"/>
  </div>
</template>

<script setup>
import { onMounted, useTemplateRef, version } from 'vue';
import packageJson from "../package.json";

const vueVersion = packageJson.dependencies.vue;

const remoteMountPointRef1 = useTemplateRef("remoteMountPoint1");
const remoteMountPointRef2 = useTemplateRef("remoteMountPoint2");

onMounted(async () => {

  const remote1 = await import('remoteApp1/MfeRemote1');
  remote1.mount(remoteMountPointRef1.value);

  const remote2 = await import('remoteApp2/MfeRemote2');
  remote2.mount(remoteMountPointRef2.value);
});
</script>