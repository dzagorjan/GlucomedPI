import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import { useAuthStore } from '@/stores/authStore'

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
            meta: {
                requiresAuth:true,
            },
        },

        {
            path: '/glucose',
            name: 'glucose',
            component: () => import('@/views/GlucoseView.vue'),
            meta: {
                requiresAuth:true,
                roles: ['patient'],
            },
        },

        {
            path: '/statistics',
            name: 'statistics',
            component: () => import('@/views/StatisticsView.vue'),
            meta: {
                requiresAuth: true,
                roles: ['patient'],
            },
        },

        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/views/ProfileView.vue'),
            meta: {
                requiresAuth: true,
                roles: ['patient', 'doctor'],
            },
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            meta: {
                guestOnly:true,
            },
        },

        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegisterView.vue'),
            meta: {
                guestOnly: true,
            },
        },

        {
            path:'/patients',
            name: 'patients',
            component: () => import('@/views/PatientsView.vue'),
            meta: {
                requiresAuth: true,
                roles: ['doctor'],
            },
        },

        {
            path: '/glucose/add',
            name: 'glucose-add',
            component: () => import('@/views/GlucoseFormView.vue'),
            meta: {
                requiresAuth: true,
                roles: ['patient'],
            },
        },

        {
            path: '/glucose/edit/:id',
            name: 'glucose-edit',
            component: () =>
                import('@/views/GlucoseEditView.vue'),
            meta: {
                requiresAuth: true,
                roles: ['patient'],
            },
        },

        {
            path: '/medications',
            name: 'medications',
            component: () =>
                import('@/views/MedicationsView.vue'),
            meta: {
                requiresAuth: true,
                roles: ['patient'],
            },
        },


    ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (
    to.meta.requiresAuth &&
    !authStore.isAuthenticated
  ) {
    return {
      name: 'login',
    }
  }

  if (
    to.meta.guestOnly &&
    authStore.isAuthenticated
  ) {
    return {
      name: 'dashboard',
    }
  }

  if (
    to.meta.roles &&
    authStore.userProfile &&
    !to.meta.roles.includes(authStore.userProfile.role)
  ) {
    return {
      name: 'dashboard',
    }
  }
})


export default router