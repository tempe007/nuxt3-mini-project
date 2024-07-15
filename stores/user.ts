import { defineStore } from 'pinia'
import { auth } from '@/plugins/firebase'
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

export interface User {
    uid: string
    email: string
}

interface UserState {
    user: User | null
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        user: null
    }),
    getters: {
        isAuthenticated: (state): boolean => !!state.user
    },
    actions: {
        async login(email: string, password: string) {
            try {
                // const userCredential = await signInWithEmailAndPassword(auth, email, password)
                // this.user = {
                //     uid: userCredential.user.uid,
                //     email: userCredential.user.email as string
                // }
            } catch (error) {
                console.error("Error logging in: ", error)
            }
        },
        async register(email: string, password: string) {
            try {
                // const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                // this.user = {
                //     uid: userCredential.user.uid,
                //     email: userCredential.user.email as string
                // }
            } catch (error) {
                console.error("Error registering: ", error)
            }
        },
        async logout() {
            try {
                // await signOut(auth)
                // this.user = null
            } catch (error) {
                console.error("Error logging out: ", error)
            }
        }
    }
})