import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'

Vue.config.productionTip = false

Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})
App.mpType = 'app'


Vue.component('cu-custom',cuCustom)

const app = new Vue({
    ...App
})
app.$mount()
