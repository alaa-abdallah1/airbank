import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import apolloProvider from './plugins/apollo'

// helpers
import baseMixin from './mixins/base'
Vue.mixin(baseMixin)

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app')
