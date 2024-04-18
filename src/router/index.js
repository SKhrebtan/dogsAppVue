import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import OneDogView from '../views/OneDogView.vue'
import { useAuthStore } from '@/stores/auth'
import { ref, watch } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/onedog/:id',
      name: 'onedog',
      component: OneDogView
    },
    {
      path: '/mydogs',
      name: 'mydogs',
      component: () => import('../views/MyDogsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  watch(
    () => store.userToken,
    (newValue, oldValue) => {
      user.value = newValue
    }
  )
  const user = ref(store.userToken)
  const isAuthenticated = !!user.value
  console.log(isAuthenticated)
  if (to.name === 'mydogs' && !isAuthenticated) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
