import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

//import IndexPage from './App'
import layout from './views/layout'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)
let router = new VueRouter({
	mode: 'history',
	routes: [
		{
            path: '/demo',
            component: layout
        }
	]
})
//Vue.config.productionTip = true;

new Vue({
    render: h => h(layout),
    router
}).$mount('#app');

