import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      component: Home
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/');
  else next();
});


export default router;