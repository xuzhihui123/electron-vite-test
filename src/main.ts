import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// 创建vue实例
createApp(App).use(store).mount('#app')
