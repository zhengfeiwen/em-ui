// import "core-js/stable"
// import "regenerator-runtime/runtime"
import Vue from 'vue'
import App from './App.vue'
import SvgIcon from 'vue-svgicon'

// import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import '@/packages/theme/var.scss'
import '@/icons/components'

// import Em from '@/packages/index'
// Em.install(Vue)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
