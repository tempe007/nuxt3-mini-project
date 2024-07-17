import { defineStore } from 'pinia'
import {collection,Query, type DocumentData, getDocs, addDoc, deleteDoc, doc, updateDoc,query, orderBy,} from "firebase/firestore";
import { db } from '@/plugins/firebase'
import type { Todo, TodoState, AddTodo } from "~/types/Todo";


export const useTodoStore = defineStore('todo', {
    state: (): TodoState => ({
        todos: []
    }),
    getters: {
        isEmptyTodos: (state) : boolean => state.todos.length === 0
    },
    actions: {
        async getTodos(uid: string) {
            this.todos = [];
            const querySnapshot = await getDocs(query(collection(db, 'todos') as unknown as Query<DocumentData>));
            querySnapshot.forEach((doc) => {
                if(uid === doc.data().uid) {
                    let todo : Todo = {
                        id: doc.id,
                        text: doc.data().text,
                        uid: doc.data().uid,
                        completed: doc.data().completed,
                        priority: doc.data().priority,
                        comments: [],
                     //   createdAt : doc.data().createdAt.toDate()
                    };
                    this.todos.push(todo);
                }
            })

        },
        async addTodo(text: string,priority:number, uid: string) {
            const createdAt = new Date()
            const newTodo : AddTodo = {
                text,
                uid,
                completed: false,
                priority,
                comments: [],
                //createdAt
            };
            try {
                await addDoc(collection(db, 'todos'), newTodo);
                await this.getTodos(uid);
            } catch (e) {
                console.error(e);
                alert("할 일 등록 실패");
            }
        },
        async toggleTodo(todo: Todo, uid: string) {
              try {
                  const docRef = doc(db, 'todos', todo.id);
                  const updateTodo = {
                      text: todo.text,
                      uid: todo.uid,
                      completed: !todo.completed,
                      comments: todo.comments
                  };

                  await updateDoc(docRef, updateTodo);
                  await this.getTodos(uid);
              } catch (e) {
                  console.error(e);
                  alert("할 일 수정 실패");
              }


        },
        async removeTodo(id: string, uid: string) {
            try {
                const docRef = doc(db, 'todos', id);
                await deleteDoc(docRef);
                await this.getTodos(uid);
            } catch (e) {
                console.error(e);
                alert("할 일 삭제 실패");
            }
        },
        clearTodo(uid: string) {
            Promise.all(
                this.todos.map(async todo => {
                    const docRef = doc(db, 'todos', todo.id);
                    await deleteDoc(docRef);
                })
            ).then(() => {
                this.getTodos(uid)
            }).catch(e => {
                console.error(e);
            })
        },
        addComment(id: string, comment: string) {
            const todo = this.todos.find(todo => todo.id === id)
            if (todo) {
                todo.comments.push(comment)
            }
        }
    }
})