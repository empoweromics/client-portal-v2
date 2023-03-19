import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAF_QMR0UbrGbxyDX62x4OMhatYayailoM',
  authDomain: 'empoweromics-dev.firebaseapp.com',
  projectId: 'empoweromics-dev',
  storageBucket: 'empoweromics-dev.appspot.com',
  messagingSenderId: '127286142109',
  appId: '1:127286142109:web:8e0c1aae077e199a046074',
  measurementId: 'G-FWEBPF9DCH'
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const getTokenId = () => auth.currentUser.getIdToken(true);
