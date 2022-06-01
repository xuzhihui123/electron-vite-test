<script  lang="tsx">
import { defineComponent, h } from 'vue'
import Test2 from './Test2.vue'
export default defineComponent({
  name: '',
  setup () {
    return {
    }
  },
  render () {
    let node1 = h('div', { class: 'aaa', style: { color: 'red' } }, ['123', '222'])
    let node2 = h(Test2, {}, {
      default: (props:any) => {
        return h('div', props.test1.name)
      }
    })
    return (
      <div>
        <h1>test1</h1>
        {node1}
        {node2}
        {this.$slots.default!()}
      </div>
    )
  }
})
</script>

<style scoped lang="scss">

</style>
