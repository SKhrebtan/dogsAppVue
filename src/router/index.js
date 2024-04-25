import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import OneDogView from '../views/OneDogView.vue'
import DashboardView from '../views/DashboardView.vue'
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
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
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
  watch(
    () => store.userAuth,
    (newValue, oldValue) => {
      userInfo.value = newValue
    }
  )
  const user = ref(store.userToken)
  const userInfo = ref(store.userAuth)
  const isAuthenticated = !!user.value

  if ((to.name === 'mydogs' && !isAuthenticated) || (to.name === 'dashboard' && !isAuthenticated)) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    if (userInfo.value.role === 'admin') {
      next({ name: 'dashboard' })
    } else {
      next({ name: 'mydogs' })
    }
  } else if (to.name === 'dashboard' && isAuthenticated && userInfo.value.role !== 'admin') {
    next({ name: 'mydogs' })
  } else {
    next()
  }
})

export default router
