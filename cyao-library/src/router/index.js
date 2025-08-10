import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
import About from '../view/About.vue'
import Login from '@/view/Login.vue'
import { isLoggedIn } from '../components/userState'
import FireBaseLogin from '../view/FireBaseLogin.vue'
import FireRegister from '../view/FireBaseRegister.vue'
import AddBookView from '@/view/AddBookView.vue'
import WeatherView from '@/view/WeatherView.vue'
import CountBookAPI from '@/view/CountBookAPI.vue'
import GetAllBookView from '@/view/GetAllBookView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/GetAllBook',
    name: 'GetAllBook',
    component: GetAllBookView
  },
  {
    path: '/weather',
    name: 'weather',
    component: WeatherView
  },
  {
    path: '/countBookApi',
    name: 'countBookApi',
    component: CountBookAPI
  },
  {
    path: '/addbook',
    name: 'addBook',
    component: AddBookView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FireBaseLogin
  },
    {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FireRegister
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    beforeEnter: (to, from, next) => {
      // Perform logic before entering the About route
      if (isLoggedIn.value) {
        console.log(isLoggedIn)
        next();
      } else {
        next(false); // Cancel the navigation
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router