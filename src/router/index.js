import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Form from '../views/Form'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/form',
        name: 'Form Page',
        component: Form,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
}) 

export default router
