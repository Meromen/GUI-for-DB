import mainPage from './components/MainPage.vue'
import tableList from './components/TableList.vue'
import tableView from './components/TableView.vue'

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
    path: '/tableview/:tableName',
    props: true,
    name: 'tableView',
    component: tableView
  },
  {
    path: '*',
    component: { template: '<h1>Page Not Found</h1>' }
  }
]
