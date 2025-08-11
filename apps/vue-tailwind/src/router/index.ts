import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/flexbox',
        name: 'flexbox',
        component: () => import('@/views/Flexbox.vue')
    },
    {
        path: '/grid',
        name: 'grid',
        component: () => import('@/views/Grid.vue')
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: () => import('@/views/Pricing.vue')
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('@/views/Checkout.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
