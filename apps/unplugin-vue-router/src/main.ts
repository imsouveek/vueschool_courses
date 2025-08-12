import '@/assets/main.css'
import 'vue-plugins/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import { createToolTip } from 'vue-plugins'

const app = createApp(App)
app.use(DataLoaderPlugin, { router })
app.use(
    createToolTip({
        placement: 'right'
    })
)
app.use(router)

app.mount('#app')

app.config.errorHandler = (error, info) => {
    console.log(error)
    console.log(info)
}
