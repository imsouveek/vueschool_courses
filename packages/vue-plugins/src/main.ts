import { createApp } from 'vue'
import App from './App.vue'
import { createToolTip } from './TooltipPlugin'

createApp(App)
    .use(
        createToolTip({
            placement: 'right',
            arrow: false,
            trigger: 'click',
            hideOnClick: false
        })
    )
    .mount('#app')
