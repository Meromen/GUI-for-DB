import mainPage from './components/MainPage.vue'
import tableList from './components/TableList.vue'

export const routes = [
  {
    path: '',
    name: 'namePage',
    component: mainPage
  },
  {
    path: '/tablelist',
    name: 'tableList',
    component: tableList
  },
  {
    path: '*',
    component: { template: '<h1>Page Not Found</h1>' }
  }
]
