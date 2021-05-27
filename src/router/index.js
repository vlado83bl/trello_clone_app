import { createRouter, createWebHistory } from 'vue-router'

import TheBoards from '../components/boards/TheBoards.vue';
import TestComponent from '../components/TestComponent.vue';
import BoardList from '../components/boards/BoardList.vue'

const routes = [
  { path: '/', redirect: '/boards' },
  { path: '/boards', component: TheBoards },
  { path: '/boardlist', component: BoardList },
  { path: '/test', component: TestComponent }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
