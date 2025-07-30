import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AppLink from '@/components/AppLink.vue'

const app = createApp(App)

app.use(router).component('AppLink', AppLink).mount('#app')
