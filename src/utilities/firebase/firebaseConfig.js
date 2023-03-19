import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCssQAyNJjZgA0jHlSQYAPFJ9-qn6vagG8',
  authDomain: 'platform-3-35c05.firebaseapp.com',
  projectId: 'platform-3-35c05',
  storageBucket: 'platform-3-35c05.appspot.com',
  messagingSenderId: '638666491959',
  appId: '1:638666491959:web:cadd6ca3f588c6eab9d7b2',
  measurementId: 'G-KE0ZV9FR3P'
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
