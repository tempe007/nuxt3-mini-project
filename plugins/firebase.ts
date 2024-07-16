import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { useRuntimeConfig } from "#app";

interface FirebaseConfig {
  apiKey : string;
  authDomain : string;
  projectId: string;
  storageBucket : string;
  messagingSenderId : string;
  appId : string
}

export const firebaseApp = () => {
  const config = useRuntimeConfig();
  const firebaseConfig : FirebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  // Firebase 초기화
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  return { app, auth, db };
}

export default defineNuxtPlugin((nuxtApp) => {
  const { db, auth } = firebaseApp();
  nuxtApp.provide('db', db);
  nuxtApp.provide('auth', auth);
});

export class auth {
}