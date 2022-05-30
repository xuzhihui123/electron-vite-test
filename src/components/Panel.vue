<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue'
import { getImageUrl } from '@/util/util'

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
      const texture = resources[logoPng].texture
      const rectangle = new Rectangle(96, 64, 32, 32)
      // Tell the texture to use that rectangular section
      texture.frame = rectangle

      // 创建精灵
      const sprite = new Sprite(resources[logoPng].texture)
      // sprite.texture = ..
      sprite.x = 20
      sprite.y = 20
      sprite.vx = 0
      sprite.vy = 0
      // sprite.width = 100
      // sprite.height=100
      // sprite.scale.x = 0.2
      // sprite.scale.y = 0.2
      sprite.scale.set(1.5, 1.5)
      // sprite.rotation = 0.7
      // sprite.pivot.set(100, 50)
      // sprite.anchor.x = 0.5;
      // sprite.anchor.y = 0.5;
      // sprite.anchor.set()
      // sprite.scale.set(0.5, 0.5);
      // sprite.position.set(x, y) 设置位置

      // console.log(app.stage)

      app.stage.addChild(sprite)
      // app.stage.removeChild(sprite) 删除
      // sprite.visible = false  隐藏

      app.ticker.add((delta:any) => gameLoop(delta, sprite))
      function gameLoop (delta:any, sprite:any) {
        sprite.vx = 1
        sprite.vy = 1
        // Move the cat 1 pixel
        sprite.x += sprite.vx
        sprite.y += sprite.vy
      }
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
