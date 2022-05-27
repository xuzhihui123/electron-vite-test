import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron/renderer'
import polyfillExports from 'vite-plugin-electron/polyfill-exports'
import vueJsx from '@vitejs/plugin-vue-jsx' // jsx
import eslintPlugin from 'vite-plugin-eslint' // eslint

// const config = loadEnv('development', './')  获取环境变量
// console.log(config) //

export default defineConfig({
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
        entry: 'electron-main/index.ts'
      },
      preload: {
        // Must be use absolute path, this is the limit of rollup
        input: path.join(__dirname, './electron-preload/index.ts')
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
