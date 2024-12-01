import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

type CreateRouteOptions = Partial<Omit<RouteRecordRaw, 'path' | 'name' | 'component'>>

const createRoute = (
  name: RouteRecordRaw['name'],
  path: RouteRecordRaw['path'],
  component: RouteRecordRaw['component'],
  options: CreateRouteOptions
): RouteRecordRaw => {
  return {
    name,
    path,
    component,
    ...options
  } as RouteRecordRaw
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    createRoute('home', '/', () => import('../components/TodoList.vue'), {
      meta: { title: '待办事项列表' }
    }),
    createRoute('create', '/create', () => import('../components/TodoCreate.vue'), {
      meta: { title: '创建待办事项' }
    }),
    createRoute('detail', '/todo/:id', () => import('../components/TodoDetail.vue'), {
      meta: { title: '待办事项详情' }
    })
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Todo App'}`
  next()
})

export default router
