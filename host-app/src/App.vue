<template>
  <div>
    <h1>Host App</h1>
    <div>Counter: {{ counter.count }}</div>
    <button @click="counter.increment">Increment</button>
    <div ref="remoteMountPoint"/>
  </div>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue';

const counter = ref({
  count: 0,
  increment: () => {
    counter.value.count++;
  }
});

const remoteMountPointRef = useTemplateRef("remoteMountPoint");

onMounted(async () => {
  const remote = await import('remoteApp/MfeRemote');
  remote.mount(remoteMountPointRef.value);
});
</script>