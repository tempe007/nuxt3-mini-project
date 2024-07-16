import { defineStore } from 'pinia'
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/plugins/firebase'
import type { Todo, TodoState } from "~/types/Todo";

export const useTodoStore = defineStore('todo', {
    state: (): TodoState => ({
        todos: []
    }),
    actions: {
        async getTodos(uid) {
            this.todos = [];
            const querySnapshot = await getDocs(collection(db, 'todos'));
            querySnapshot.forEach((doc) => {
                if(uid === doc.data().uid) {
                    let todo : Todo = {
                        id: doc.id,
                        text: doc.data().text,
                        uid: doc.data().uid,
                        completed: false,
                        comments: []
                    };
                    this.todos.push(todo);
                }
            })

        },
        addTodo(text: string) {
            const newTodo : Todo = {
                id: "",
                text,
                uid: "",
                completed: false,
                comments: []
            }
            this.todos.push(newTodo)
        },
        toggleTodo(id: string) {
            const todo = this.todos.find(todo => todo.id === id)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        removeTodo(id: string) {
            this.todos = this.todos.filter(todo => todo.id !== id)
        },
        addComment(id: string, comment: string) {
            const todo = this.todos.find(todo => todo.id === id)
            if (todo) {
                todo.comments.push(comment)
            }
        }
    }
})