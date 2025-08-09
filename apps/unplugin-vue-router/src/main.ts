import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

app.config.errorHandler = (error, info) => {
    console.log(error)
    console.log(info)
}
