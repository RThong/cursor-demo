<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Todo } from '../types/todo'
import { todoStorage } from '../utils/storage'

const todos = ref<Todo[]>([])

// 按最后修改时间排序的待办事项
const sortedTodos = computed(() => {
  return [...todos.value].sort((a, b) => {
    // 如果有 updatedAt，使用 updatedAt，否则使用 createdAt
    const aTime = new Date(a.updatedAt || a.createdAt).getTime()
    const bTime = new Date(b.updatedAt || b.createdAt).getTime()
    return bTime - aTime // 降序排列，最新的在前
  })
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString()
}

const loadTodos = () => {
  todos.value = todoStorage.getAll()
}

const removeTodo = (id: number) => {
  todoStorage.remove(id)
  loadTodos()
}

onMounted(() => {
  loadTodos()
})
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">待办事项清单</h1>
      <router-link to="/create" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        创建新待办
      </router-link>
    </div>

    <ul class="space-y-3">
      <li
        v-for="todo in sortedTodos"
        :key="todo.id"
        class="flex flex-col gap-2 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        :class="{ 'bg-gray-50': todo.completed }">
        <div class="flex items-center gap-4">
          <input
            type="checkbox"
            v-model="todo.completed"
            class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <router-link :to="`/todo/${todo.id}`" class="flex-1">
            <span class="text-gray-700" :class="{ 'line-through text-gray-400': todo.completed }">
              {{ todo.text }}
            </span>
          </router-link>
          <button
            @click="removeTodo(todo.id)"
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            删除
          </button>
        </div>
        <div class="flex gap-4 text-sm text-gray-500 ml-9">
          <span>创建时间: {{ formatDate(todo.createdAt) }}</span>
          <span v-if="todo.updatedAt">最后修改: {{ formatDate(todo.updatedAt) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
