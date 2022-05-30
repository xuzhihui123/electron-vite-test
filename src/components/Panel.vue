<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue'
import { getImageUrl } from '@/util/util'
import cloneDeep from 'lodash/cloneDeep'

export default defineComponent({
  name: 'Child',
  setup () {
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
    const Container = PIXI.Container
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
      sprite1.position.set(10, 10)

      const texture2 = cloneDeep(texture1)
      const rectangle2 = new Rectangle(0, 0, 32, 32)
      // Tell the texture to use that rectangular section
      texture2.frame = rectangle2

      // 创建精灵
      const sprite2 = new Sprite(texture2)
      sprite2.position.set(20, 20)

      // 创建分组
      const spritesArr = new Container()
      spritesArr.addChild(sprite1)
      spritesArr.addChild(sprite2)
      spritesArr.position.set(100, 100)

      // 精灵的局部坐标
      console.log(sprite1.x)
      // 精灵的全局坐标 -》相对于舞台左上角位置
      console.log(spritesArr.toGlobal(sprite1.position)) // 相当于console.log(sprite1.parent.toGlobal(sprite1.position)) 拿到父容器
      // 如果不关心父亲容器 拿到精灵的全局坐标
      console.log(sprite1.getGlobalPosition()) // {x: 110, y: 110}

      console.log(sprite2.toLocal(sprite2.position, sprite1).x) // 精灵2位于精灵1向右偏移10像素

      // console.log(spritesArr.children)
      // spritesArr.width = 100
      // spritesArr.height = 100

      // spritesArr.rotation = 0.7
      // 将整个精灵分组 向右向下移动

      app.stage.addChild(spritesArr)

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
