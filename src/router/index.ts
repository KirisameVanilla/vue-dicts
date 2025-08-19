import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: () => import('../views/HomePage.vue') },
        { path: '/dict', name: 'Dict', component: () => import('../views/DictPage.vue') },
        { path: '/trans', name: 'Translation', component: () => import('../views/TranslationPage.vue') },
        { path: '/write', name: 'Writing', component: () => import('../views/WritingPage.vue') },
        { path: '/login', name: 'Login', component: () => import('../views/LoginPage.vue') },
    ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token')
    
    // 需要认证的页面
    const requiresAuth = ['Dict', 'Translation', 'Writing']
    
    if (requiresAuth.includes(to.name as string) && !token) {
        next('/login')
    } else if (to.name === 'Login' && token) {
        next('/')
    } else {
        next()
    }
})

export default router