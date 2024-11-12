import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'HomeUser',
        component: () => import('@/views/user/Home.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue')
    },
    {
        path: '/user/profile',
        name: 'UserProfile',
        component: () => import('@/views/user/Profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin',
        name: 'HomeAdmin',
        component: () => import('@/views/admin/Home.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/papers/board',
        name: 'AdminPaperBoard',
        component: () => import('@/views/admin/PaperBoard.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/request',
        name: 'AdminRequest',
        component: () => import('@/views/admin/Request.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/request/detail',
        name: 'AdminRequestDetail',
        component: () => import('@/components/AdminRequestDetail.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/user',
        name: 'AdminUserList',
        component: () => import('@/views/admin/UserList.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/user/papers/board',
        name: 'UserPaperBoard',
        component: () => import('@/views/user/PaperBoard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/user/papers/list',
        name: 'UserPaperList',
        component: () => import('@/views/user/PaperList.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/papers/list',
        name: 'AdminPaperList',
        component: () => import('@/views/admin/PaperList.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore();
    const isLoggedIn = authStore.checkLoginStatus();

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else if (to.meta.requiresAdmin && !authStore.user?.isAdmin) {
        next('/');
    } else {
        next();
    }
});

export default router;