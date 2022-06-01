import { defineConfig, loadEnv } from 'vite'
// 导入类型
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron/renderer'
import polyfillExports from 'vite-plugin-electron/polyfill-exports'
import vueJsx from '@vitejs/plugin-vue-jsx' // jsx
import eslintPlugin from 'vite-plugin-eslint' // eslint

console.log(path.resolve(__dirname))

export default ({ mode }) => {
  // loadEnv方法拿到.env.production或者开发环境设置的环境变量
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  // 给vite-plugin-electron 插件添加额外vite配置，define嵌入额外环境变量
  let electronViteConfig:UserConfig = {
    build: {
    },
    envDir: path.resolve(__dirname),
    define: { // 嵌入额外变量
      'customConfig.env': {
        ...process.env
      }
    }
  }
  return defineConfig({
    optimizeDeps: {
      include: ['pixi.js']
    },
    define: { // 客户端没有process.env这个概念，这样定义可以在客户端中拿到process.env.TEST_VARIABLE -> 也就是在package.json中cross-env定义的变量 ，
      'process.env': {
        ...process.env
      }
    },
    plugins: [
      vue(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue', 'src/**/*.jsx', 'src/**/*.tsx', 'src/*.jsx', 'src/*.tsx']
      }),
      electron({
        main: {
          entry: 'electron-main/index.ts',
          vite: electronViteConfig
        },
        preload: {
          // Must be use absolute path, this is the limit of rollup
          input: path.join(__dirname, './electron-preload/index.ts'),
          vite: electronViteConfig
        }
      }),
      electronRenderer(),
      polyfillExports()
    ],
    build: {
      emptyOutDir: false // 必须配置，否则electron相关文件将不会生成build后的文件
    },
    resolve: { // 别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 3000
    }
  })
}
