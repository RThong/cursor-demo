import type { Todo } from '../types/todo'

const STORAGE_KEY = 'vue-todo-items'

export const todoStorage = {
  // 获取所有待办事项
  getAll(): Todo[] {
    const items = localStorage.getItem(STORAGE_KEY)
    return items ? JSON.parse(items) : []
  },

  // 保存所有待办事项
  save(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },

  // 添加一个待办事项
  add(todo: Omit<Todo, 'id' | 'completed' | 'createdAt'>): Todo {
    const todos = this.getAll()
    const newTodo: Todo = {
      id: Date.now(),
      ...todo,
      completed: false,
      createdAt: new Date().toISOString()
    }
    todos.push(newTodo)
    this.save(todos)
    return newTodo
  },

  // 更新一个待办事项
  update(todo: Todo): void {
    const todos = this.getAll()
    const index = todos.findIndex(t => t.id === todo.id)
    if (index !== -1) {
      todos[index] = {
        ...todo,
        updatedAt: new Date().toISOString()
      }
      this.save(todos)
    }
  },

  // 删除一个待办事项
  remove(id: number): void {
    const todos = this.getAll()
    const newTodos = todos.filter(todo => todo.id !== id)
    this.save(newTodos)
  },

  // 根据 ID 获取待办事项
  getById(id: number): Todo | undefined {
    const todos = this.getAll()
    return todos.find(todo => todo.id === id)
  }
}
