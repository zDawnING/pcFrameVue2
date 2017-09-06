import Vue from 'vue'
import VueResource from 'vue-resource'
import app from './login.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.use(VueResource)
Vue.use(iView)

Vue.http.options.emulateJSON = true
// Set default values using the global configuration.
if (process.env.NODE_ENV === 'development') {  // 开发环境下，引入mockjs调试数据模块
  Vue.http.options.root = '/jasp2.0'
} else {
	Vue.http.options.root = ''
}

if (process.env.NODE_ENV === 'development') {  // 开发环境下，引入mockjs调试数据模块
  // require('./vendor/mocktest')
}


new Vue({
  render: h => h(app)
}).$mount('#app')
