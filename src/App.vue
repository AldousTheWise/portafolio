<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="portafolio-app">
    <RouterView></RouterView>
  </div>
</template>

<style>
.portafolio-app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>