import { createApp } from 'vue'
import App from './App.vue'
import { TooltipPlugin } from './TooltipPlugin'

createApp(App).use(TooltipPlugin, { option: 'TEST' }).mount('#app')
