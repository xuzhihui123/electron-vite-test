<script setup lang="ts">
// import Child from './Child.vue'
// import Panel from './Panel.vue'
import os from 'os'
import CanvasPanel from './CanvasPanel.vue'
console.log(os)
</script>

<template>
  <!-- <Child /> -->

  <p>------</p>

  <!-- <Panel /> -->

  <CanvasPanel />
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
