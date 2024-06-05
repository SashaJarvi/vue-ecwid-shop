import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'DefaultLayout' }
    },
    {
      path: '/product/:productId',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      meta: { layout: 'DefaultLayout' }
    },
    {
      path: '/category/:categoryId',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      meta: { layout: 'DefaultLayout' }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { layout: 'DefaultLayout' }
    }
  ]
})

export default router
