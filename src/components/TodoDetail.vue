<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Todo } from '../types/todo'
import { todoStorage } from '../utils/storage'

const route = useRoute()
const router = useRouter()
const todo = ref<Todo | null>(null)

onMounted(() => {
  const id = Number(route.params.id)
  todo.value = todoStorage.getById(id) || null

  if (!todo.value) {
    router.push('/')
  }
})

const toggleComplete = () => {
  if (!todo.value) return

  todo.value.completed = !todo.value.completed
  todoStorage.update(todo.value)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString()
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6" v-if="todo">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">待办事项详情</h2>
        <span
          class="px-3 py-1 rounded-full text-sm"
          :class="todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
          {{ todo.completed ? '已完成' : '进行中' }}
        </span>
      </div>

      <div class="space-y-4 mb-6">
        <div>
          <label class="text-sm font-medium text-gray-500">标题</label>
          <p class="mt-1 text-gray-900">{{ todo.text }}</p>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-500">描述</label>
          <p class="mt-1 text-gray-900">{{ todo.description || '无' }}</p>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-500">截止日期</label>
          <p class="mt-1 text-gray-900">{{ todo.dueDate || '无' }}</p>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-500">创建时间</label>
          <p class="mt-1 text-gray-900">{{ formatDate(todo.createdAt) }}</p>
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <button
          @click="toggleComplete"
          class="px-4 py-2 rounded-md text-white transition-colors"
          :class="todo.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'">
          {{ todo.completed ? '标记为未完成' : '标记为已完成' }}
        </button>
        <button
          @click="$router.push('/')"
          class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
          返回列表
        </button>
      </div>
    </div>
  </div>
</template>
