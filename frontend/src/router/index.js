import Vue from 'vue'
import VueRouter from 'vue-router'

import Transactions from '../views/transactions'
import TransactionView from '../views/transactions/view.vue'

import NotFound from './../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/transactions',
  },

  // Transactions views
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
  },
  {
    path: '/transactions/:id',
    name: 'TransactionView',
    component: TransactionView,
  },

  // Not Found Page
  { path: '/404', alias: '*', name: 'NotFound', component: NotFound },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
})

export default router
