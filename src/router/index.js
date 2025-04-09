// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import MainPage from '../components/MainPage.vue';
import ContactSupport from '../components/ContactSupport.vue';
import InternalNotes from '../components/InternalNotes.vue';
import Login from '../components/Login.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/home', name: 'Home', component: Home },
    {
        path: '/main',
        name: 'MainPage',
        component: MainPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/support',
        name: 'ContactSupport',
        component: ContactSupport,
        meta: { requiresAuth: true }
    },
    {
        path: '/notes',
        name: 'InternalNotes',
        component: InternalNotes,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('appData') && JSON.parse(localStorage.getItem('appData')).currentUser;
    console.log('Navigating to:', to.path, 'Logged in:', isLoggedIn);
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
