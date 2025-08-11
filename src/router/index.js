import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import About from '@/views/AboutPage.vue'
import HelloWorld from '@/views/HelloWorldPage.vue'
import IfelsePage from '@/views/IfelsePage.vue'
import ForloopPage from '@/views/ForloopPage.vue'
import ShowImage from '@/views/ShowImage.vue'
import FormPage from '@/views/FormPage.vue'
import FunctionPage from '@/views/FunctionPage.vue'
import DemoPage from '@/views/DemoPage.vue'
import ComputedPage from '@/views/ComputedPage.vue'
import ClickPage from '@/views/ClickPage.vue'


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/HelloWorld', name: 'HelloWorld', component: HelloWorld },
    { path: '/ifelse', name: 'Ifelse', component: IfelsePage },
    { path: '/forloop', name: 'Forloop', component: ForloopPage },
    { path: '/showimage', name: 'ShowImage', component: ShowImage },
    { path: '/formpage', name: 'FormPage', component: FormPage },
    { path: '/functionpage', name: 'FunctionPage', component: FunctionPage },
    { path: '/demopage', name: 'DemoPage', component: DemoPage },
    { path: '/computedpage', name: 'ComputedPage', component: ComputedPage },
    { path: '/clickpage', name: 'ClickPage', component: ClickPage }
]

const router = createRouter({
    history: createWebHistory('/hello-vue-app/'),
    routes
})

export default router