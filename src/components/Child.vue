<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { getImageUrl } from '@/util/util'
import { useUserStore } from '@/store/user'

const logoPng = getImageUrl('logo')
// import logoPng from '@/assets/logo.png'
// console.log(import.meta.env.DEV)
// console.log(import.meta.env.VITA_PARAMS)
// console.log(import.meta.env.VITE_DEV_SERVER_HOST)

export default defineComponent({
  name: 'Child',
  setup () {
    const counter = ref(0)
    // 使用store
    const userStore = useUserStore()
    setTimeout(() => {
      userStore.updateName('lancer 444')
      userStore.$patch({
        name: 'lancer xxx22'
      })
    }, 2000)

    async function openfile () {
      const filePath = await window.electronAPI.openFile()
      console.log(filePath)
    }

    // 设置标题
    window.electronAPI.setTitle('app title change before')
    //
    window.electronAPI.handleCounter((event, value) => {
      counter.value = counter.value + value
      // 发送给主进程
      event.sender.send('counter-value', value)
    })
    return () => {
      return (
        <div class="wrapper">
          <h3 class="main">{userStore.name}  </h3>
          <img src={logoPng} class="cc"/>
          <h3>{window.electronAPI.platform}</h3>
          <button onClick={() => { window.electronAPI.setTitle('lancer title') }}>设置标题</button>
          <button onClick={openfile}>打开 文件</button>
          <h2>测试值{counter.value}</h2>
        </div>
      )
    }
  }
})
</script>

<style lang="scss">
@import '@/sass/format.scss';
 .wrapper{
   @include main;
   .cc{
     width: 50px;
   }
 }
</style>
