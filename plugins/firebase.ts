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

export default defineNuxtPlugin((nuxtApp) => {
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

  nuxtApp.provide('auth', auth);
  nuxtApp.provide('db', db);
});