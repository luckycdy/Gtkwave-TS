import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouterOptions } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'gtkwave',
    component: () => import('@/views/GtkWave.vue'),
  },
]

const options: RouterOptions = {
  history: createWebHistory(),
  routes,
}
const router = createRouter(options)

export default router
