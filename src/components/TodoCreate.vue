<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Todo } from '../types/todo'

const router = useRouter()
const todo = ref({
  text: '',
  description: '',
  dueDate: '',
})

const createTodo = () => {
  const savedTodos = JSON.parse(localStorage.getItem('vue-todo-items') || '[]') as Todo[]
  
  const newTodo: Todo = {
    id: Date.now(),
    text: todo.value.text,
    description: todo.value.description,
    dueDate: todo.value.dueDate,
    completed: false,
    createdAt: new Date().toISOString()
  }
  
  savedTodos.push(newTodo)
  localStorage.setItem('vue-todo-items', JSON.stringify(savedTodos))
  
  router.push('/')
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">创建新待办事项</h2>
      
      <form @submit.prevent="createTodo" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">标题：</label>
          <input 
            type="text" 
            v-model="todo.text" 
            required
            placeholder="请输入待办事项标题"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">描述：</label>
          <textarea 
            v-model="todo.description" 
            placeholder="请输入详细描述"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">截止日期：</label>
          <input 
            type="date" 
            v-model="todo.dueDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="flex justify-end gap-4">
          <button 
            type="button" 
            @click="$router.push('/')"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            取消
          </button>
          <button 
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            创建
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 