import { defineStore } from 'pinia'

export interface Todo {
    id: number
    text: string
    completed: boolean
    comments: string[]
}

interface TodoState {
    todos: Todo[]
}

export const useTodoStore = defineStore('todo', {
    state: (): TodoState => ({
        todos: []
    }),
    actions: {
        addTodo(text: string) {
            const newTodo: Todo = {
                id: Date.now(),
                text,
                completed: false,
                comments: []
            }
            this.todos.push(newTodo)
        },
        toggleTodo(id: number) {
            const todo = this.todos.find(todo => todo.id === id)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        removeTodo(id: number) {
            this.todos = this.todos.filter(todo => todo.id !== id)
        },
        addComment(id: number, comment: string) {
            const todo = this.todos.find(todo => todo.id === id)
            if (todo) {
                todo.comments.push(comment)
            }
        }
    }
})