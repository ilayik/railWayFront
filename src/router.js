import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login"
import adminPage from "@/views/adminPage"
import UserPage from "@/views/userPage"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            component: Login
        },
        {
            path: '/admin-page',
            component: adminPage
        },
        {
            path: '/user-page',
            component: UserPage
        },
    ]
})