import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

let app = createApp(App)

// 创建vue实例
app.use(store).mount('#app')
