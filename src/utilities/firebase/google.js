import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useContext } from 'react';
import { UserContext, setUser } from 'src/contexts/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

const provider = new GoogleAuthProvider();
// export const signInGoogle = () => signInWithPopup(auth, provider);

function useGoogle() {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        auth.currentUser
          .getIdToken(true)
          .then((idToken) => {
            axios
              .get(`${process.env.REACT_APP_DEVELOP_URL}/auth`, {
                headers: { Authorization: `Bearer ${idToken}` }
              })
              .then(() => {
                localStorage.setItem(
                  'user',
                  JSON.stringify({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL
                  })
                );
                dispatch({
                  type: setUser,
                  payload: {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL
                  }
                });
                navigate('/go');
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }
  function signOutGoogle() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('user');
        //   dispatch({
        //     type: removeUser
        //   });
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  return { signInGoogle, signOutGoogle };
}

export default useGoogle;
