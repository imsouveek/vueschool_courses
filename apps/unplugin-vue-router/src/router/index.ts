import { createRouter, createWebHistory, type RouteLocation } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to: RouteLocation, from: RouteLocation, savedPosition: ScrollToOptions | null) {
        return (
            savedPosition ||
            new Promise((resolve) => setTimeout(() => resolve({ top: 0, behavior: 'smooth' }), 300))
        )
    }
})

if (import.meta.hot) {
    handleHotUpdate(router)
}

router.beforeEach((to) => {
    const isLoggedIn = false
    if (to.meta.requiresAuth && !isLoggedIn) {
        router.replace('/')
    }
})
export default router
