import { defineStore } from 'pinia'
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '@/plugins/firebase'
import type { Todo, TodoState, AddTodo } from "~/types/Todo";

export const useTodoStore = defineStore('todo', {
    state: (): TodoState => ({
        todos: []
    }),
    actions: {
        async getTodos(uid: string) {
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
        async addTodo(text: string, uid: string) {
            const newTodo : AddTodo = {
                text,
                uid,
                completed: false,
                comments: []
            };
            try {
                await addDoc(collection(db, 'todos'), newTodo);
                await this.getTodos(uid);
            } catch (e) {
                console.error(e);
                alert("할 일 등록 실패");
            }
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