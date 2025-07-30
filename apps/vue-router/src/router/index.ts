import {
    createRouter,
    createWebHistory,
    type NavigationGuardNext,
    type RouteLocation
} from 'vue-router'
import Home from '@/views/Home.vue'
import sourceData from '@/data.json'
import type Destination from '@/types/Destination'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/home',
        redirect: { name: 'home' }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/invoices',
        name: 'invoices',
        component: () => import('@/views/Invoices.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/destination/:id/:slug',
        name: 'destination.viewer',
        component: () => import('@/views/DestinationViewer.vue'),
        props: (route: RouteLocation) => ({
            id: parseInt(route.params?.id as string),
            slug: route.params?.slug as string
        }),
        beforeEnter: (to: RouteLocation, from: RouteLocation, next: NavigationGuardNext) => {
            const exists = sourceData.destinations.find(
                (destination: Destination) => destination.id === parseInt(to.params?.id as string)
            )
            if (!exists) {
                return next({
                    name: 'NotFound',
                    params: { pathMatch: to.path.split('/').slice(1) },
                    query: to.query,
                    hash: to.hash
                })
            }
            next()
        },
        children: [
            {
                path: ':experienceSlug',
                name: 'experience.viewer',
                component: () => import('@/views/ExperienceViewer.vue'),
                props: (route: RouteLocation) => ({
                    ...route.params,
                    id: parseInt(route.params?.id as string)
                })
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue')
    }
]

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

router.beforeEach((to: RouteLocation, from: RouteLocation, next: NavigationGuardNext) => {
    if (to.meta.requiresAuth && !(window as any).user) {
        return next({ name: 'login', query: { redirect: to.fullPath } })
    }
    next()
})
export default router
