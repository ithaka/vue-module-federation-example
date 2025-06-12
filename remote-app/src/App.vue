<template>
  <div>Remote App Running v3</div>
  <div>Random Number: {{randomizer.randomNumber}}</div>
  <button @click="randomizer.randomize">Randomize</button>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue';

const randomizer = ref({
  randomNumber: 5,
  randomize: () => {
    randomizer.value.randomNumber = Math.floor(Math.random() * 1000);
  }
});

</script>