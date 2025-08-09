import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

if (import.meta.hot) {
    handleHotUpdate(router)
}

router.beforeEach((to, from) => {
    const isLoggedIn = false
    if (to.meta.requiresAuth && !isLoggedIn) {
        router.replace('/')
    }
})
export default router
