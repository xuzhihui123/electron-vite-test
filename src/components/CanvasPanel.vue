<script lang="tsx">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import { getImageUrl, keyboard, hitTestRectangle } from '@/util/util'
import cloneDeep from 'lodash/cloneDeep'
import { Application, Sprite, Rectangle, TextStyle, Text } from 'pixi.js'

export default defineComponent({
  name: 'Child',
  setup () {
    const Dbtn = keyboard('d')
    const Abtn = keyboard('a')
    // const Abtn = keyboard('a')

    const wrapperRefObj = ref<null | HTMLElement>(null)

    const logoPng = getImageUrl('sprite')

    // eslint-disable-next-line no-undef
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
    const resources = app.loader.resources
    const loader = app.loader

    function setup () {
      // let texture = PIXI.utils.TextureCache["images/anySpriteImage.png"];  创建纹理
      // let sprite = new PIXI.Sprite(texture);
      let texture1 = resources[logoPng].texture
      const rectangle1 = new Rectangle(96, 64, 32, 32)
      // Tell the texture to use that rectangular section
      texture1!.frame = rectangle1
      // 创建精灵
      const sprite1 = new Sprite(texture1)
      sprite1.position.set(10, 10)
      sprite1.alpha = 0.5
      sprite1.interactive = true
      sprite1.cursor = 'pointer'
      // sprite1.buttonMode = true

      sprite1.on('click', () => {
        console.log('sprite1 click')
      })

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
        sprite1.x += 1
        console.log(hitTestRectangle(sprite1, sprite2))
      }
      Dbtn.release = () => {
        console.log('执行uop')
      }

      Abtn.press = () => {
        sprite1.x -= 1
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
      // app.renderer.autoResize = true
      app.renderer.resize(((wrapperRefObj.value) as HTMLElement).offsetWidth, ((wrapperRefObj.value) as HTMLElement).offsetHeight) // 重新设置宽高

      loader.add(logoPng).load(setup)

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

<style lang="scss" scoped>
@import '@/sass/format.scss';
 .wrapper{
  width: 100%;
  height: 500px;
 }
</style>
