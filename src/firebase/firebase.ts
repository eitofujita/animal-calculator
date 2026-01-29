import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence } from 'firebase/auth';

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } })
  .process?.env ?? {};

  const firebaseConfig = {
    apiKey: "AIzaSyACHpeHwXyB273VjknGMiiMHGjadZdTmT8",
    authDomain: "animal-manager-dbfd1.firebaseapp.com",
    projectId: "animal-manager-dbfd1",
    storageBucket: "animal-manager-dbfd1.firebasestorage.app",
    messagingSenderId: "209230970390",
    appId: "1:209230970390:web:e2ce27eec8e03028c33f37",
    measurementId: "G-Z19VX94D2X"
  };
export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let authInstance;
try {
  authInstance = getAuth(app);
} catch (error) {
  authInstance = initializeAuth(app, {
    persistence: inMemoryPersistence,
  });
}

export const auth = authInstance;
