// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebaseConfig from '@/configsData/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

// require styles
import 'swiper/dist/css/swiper.css';
import '@/assets/main.css';


Vue.use(VueFire)

firebase.initializeApp(firebaseConfig)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




export {swiper, swiperSlide}