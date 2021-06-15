import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
	let isLogin=window.sessionStorage.getItem("isLogin")
	if(isLogin){
		next()
	}else{
		if(to.path==='/login'||to.path==='/'){
			next()
		}else{
			alert('请先登陆')
			next('/login')
		}
	}
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
