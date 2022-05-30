<script lang="tsx">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import { getImageUrl, keyboard, hitTestRectangle } from '@/util/util'
import cloneDeep from 'lodash/cloneDeep'

export default defineComponent({
  name: 'Child',
  setup () {
    const Dbtn = keyboard('d')
    const Abtn = keyboard('a')
    // const Abtn = keyboard('a')

    // eslint-disable-next-line no-undef
    const PIXI = window.PIXI
    // eslint-disable-next-line no-undef
    const wrapperRefObj = ref<null | HTMLElement>(null)

    const logoPng = getImageUrl('sprite')

    // eslint-disable-next-line no-undef
    const Application = PIXI.Application
    const loader = PIXI.loader
    const resources = PIXI.loader.resources
    const Sprite = PIXI.Sprite
    const Rectangle = PIXI.Rectangle
    const TextStyle = PIXI.TextStyle
    const Text = PIXI.Text
    // const Container = PIXI.Container
    // const ParticleContainer = PIXI.particles.ParticleContainer
    // const TextureCache  = PIXI.utils.TextureCache

    const app = new Application({
      width: 256,
      height: 256,
      antialias: true, // default: false 反锯齿
      transparent: false, // default: false 透明度
      resolution: 1 // default: 1 分辨率
    })

    function setup () {
      // let texture = PIXI.utils.TextureCache["images/anySpriteImage.png"];  创建纹理
      // let sprite = new PIXI.Sprite(texture);
      const texture1 = resources[logoPng].texture
      const rectangle1 = new Rectangle(96, 64, 32, 32)
      // Tell the texture to use that rectangular section
      texture1.frame = rectangle1
      // 创建精灵
      const sprite1 = new Sprite(texture1)
      sprite1.vx = 0
      sprite1.position.set(10, 10)

      const texture2 = cloneDeep(texture1)
      const rectangle2 = new Rectangle(0, 0, 32, 32)
      // Tell the texture to use that rectangular section
      texture2.frame = rectangle2
      const sprite2 = new Sprite(texture2)
      sprite2.position.set(50, 10)

      let textStyle = new TextStyle({
        fontSize: 30,
        fill: 'white'
      })

      let message = new Text('hello lancer', textStyle)
      message.y = 100

      Dbtn.press = () => {
        sprite1.vx = 1
        sprite1.x += sprite1.vx
        console.log(hitTestRectangle(sprite1, sprite2))
      }
      Dbtn.release = () => {
        console.log('执行uop')
      }

      Abtn.press = () => {
        sprite1.vx = 1
        sprite1.x -= sprite1.vx
      }
      Abtn.release = () => {
        console.log('执行uop')
      }

      app.stage.addChild(sprite1)
      app.stage.addChild(sprite2)
      app.stage.addChild(message)

    }

    onMounted(() => {
      app.renderer.backgroundColor = 0xdc143c
      app.renderer.autoResize = true
      app.renderer.resize(wrapperRefObj.value?.offsetWidth, wrapperRefObj.value?.offsetHeight) // 重新设置宽高

      loader.add(logoPng).on('progress', (load:any, resource:any) => {
        // Display the file `url` currently being loaded
        console.log('loading: ' + resource.url)

        // Display the percentage of files currently loaded
        console.log('progress: ' + load.progress + '%')
      }).load(setup)

      wrapperRefObj.value?.appendChild(app.view)
    })

    onUnmounted(() => {
      Dbtn.unsubscribe()
    })
    return () => {
      return (
        <div class="wrapper" ref={wrapperRefObj}>
            panel
        </div>
      )
    }
  }
})
</script>

<style lang="scss">
@import '@/sass/format.scss';
 .wrapper{
  width: 100%;
  height: 500px;
 }
</style>
