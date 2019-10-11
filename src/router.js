import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import store from './store'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('./views/Books.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pages',
      name: 'pages',
      component: () => import('./views/Pages.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some( rec => rec.meta.requiresAuth)) {
    // check auth state of user
    // TODO: Fix the user when routing
    await store.dispatch('fetchCurrentUser');
    if (store.getters.user) {
      // user signed in, proceed to route
      next()
    } else {
      // no user signed in, redirect to login
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router