import { initializeApp } from "firebase/app";
import { getAuth , type Auth} from 'firebase/auth';
import { getFirestore ,Firestore} from "firebase/firestore";
import { useRuntimeConfig } from "#app";

interface FirebaseConfig {
  apiKey : string;
  authDomain : string;
  projectId: string;
  storageBucket : string;
  messagingSenderId : string;
  appId : string
}

let auth: Auth;
let db: Firestore;
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
  const app = initializeApp(firebaseConfig);

// Firebase 인증과 Firestore 서비스 초기화
  auth = getAuth(app);
  db = getFirestore(app);

  // Provide the auth and db instances to the app
  nuxtApp.provide('auth', auth);
  nuxtApp.provide('db', db);
});
export { auth, db };
