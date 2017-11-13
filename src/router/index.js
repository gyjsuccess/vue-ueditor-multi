import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/home')
const Tab1 = () => import('@/views/tab1')
const Tab2 = () => import('@/views/tab2')

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: Home,
		children: [
			{ path: '/', name: 'tab1', component: Tab1 },
			{ path: '/tab2', name: 'tab2', component: Tab2 },
		]
	}]
})