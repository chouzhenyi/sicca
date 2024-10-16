/** @format */
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router/index'
import './assets/style/base.less'

const bootstrap = () => {
  const app = createApp(App)
  setupRouter(app)
  app.mount('#app')
}

bootstrap()
