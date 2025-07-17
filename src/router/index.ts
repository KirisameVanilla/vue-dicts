import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: () => import('../views/HomePage.vue') },
        { path: '/dict', name: 'Dict', component: () => import('../views/DictPage.vue') },
        { path: '/login', name: 'Login', component: () => import('../views/LoginPage.vue') },
    ],
})