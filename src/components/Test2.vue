<template>
  <div>
    test2
    <slot :test1="test1" />
  </div>
</template>

<script  lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: '',
  setup () {
    let test1 = reactive({ name: 123 })
    setTimeout(() => {
      test1.name = 444
    }, 2000)
    return {
      test1
    }
  }
})
</script>

<style scoped lang="scss">

</style>
