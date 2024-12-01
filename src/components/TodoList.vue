<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import type { Todo } from '../types/todo'

const STORAGE_KEY = 'vue-todo-items'
const todos = ref<Todo[]>([])

const loadTodos = () => {
  const savedTodos = localStorage.getItem(STORAGE_KEY)
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
}

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})

onMounted(() => {
  loadTodos()
})

const removeTodo = (id: number) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">待办事项清单</h1>
      <router-link 
        to="/create" 
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        创建新待办
      </router-link>
    </div>
    
    <ul class="space-y-3">
      <li 
        v-for="todo in todos" 
        :key="todo.id" 
        class="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        :class="{ 'bg-gray-50': todo.completed }"
      >
        <input 
          type="checkbox" 
          v-model="todo.completed"
          class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        >
        <router-link 
          :to="`/todo/${todo.id}`" 
          class="flex-1"
        >
          <span 
            class="text-gray-700"
            :class="{ 'line-through text-gray-400': todo.completed }"
          >
            {{ todo.text }}
          </span>
        </router-link>
        <button 
          @click="removeTodo(todo.id)" 
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          删除
        </button>
      </li>
    </ul>
  </div>
</template> 