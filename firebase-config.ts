import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDhsl9IVPDi2haqag9KKBLGX2s6w2baIO4',
  authDomain: 'personal-library-a6f04.firebaseapp.com',
  projectId: 'personal-library-a6f04',
  storageBucket: 'personal-library-a6f04.appspot.com',
  messagingSenderId: '330900748465',
  appId: '1:330900748465:web:e0e921b329786563b64a90',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
