<script setup lang="ts">
// import Child from './Child.vue'
// import Panel from './Panel.vue'
import os from 'os'
import CanvasPanel from './CanvasPanel.vue'
import Test from './Test.vue'
let platform = os.platform
</script>

<template>
  <!-- <Child /> -->
  <p>
    platform
    {{ platform }}
  </p>

  <p>------</p>

  <!-- <Panel /> -->
  <Test>
    <template>
      <div>
        slots
      </div>
    </template>
  </Test>

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
