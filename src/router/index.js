import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
        path: '/',
        name: 'home',
        component:HomeView,
        },

        {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component:() => import('@/views/NotFoundView.vue'),
        },

        {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
        },

        {
        path: '/glucose',
        component: () => import('@/views/GlucoseView.vue'),
        },

        {
        path: '/statistics',
        component: () => import('@/views/StatisticsView.vue'),
        },

        {
        path: '/profile',
        component: () => import('@/views/ProfileView.vue'),
        },




    ],
})

export default router