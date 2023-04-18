import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { useContext } from 'react';
import { UserContext, setUser } from 'src/contexts/UserContext';
// import axios from 'axios';
import { useNavigate } from 'react-router';
import axiosClient from '../axios/axiosIntercept';

const provider = new GoogleAuthProvider();
// export const signInGoogle = () => signInWithPopup(auth, provider);
function useGoogle() {
  const auth = getAuth();
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const authLogin = async (user) => {
    try {
      const res = await axiosClient.put(`/client/auth/${user.uid}`, {
        ...user,
        firebaseId: user.uid
      });
      console.log(res);
      navigate('/go');
    } catch (e) {
      console.log(e);
    }
  };
  // ----------------------------------------------------------------------------------------------

  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        authLogin(user);
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

        auth.currentUser
          .getIdToken(true)
          .then((idToken) => {
            // axios
            //   .get(`${process.env.REACT_APP_DEVELOP_URL}/auth`, {
            //     headers: { Authorization: `Bearer ${idToken}` }
            //   })
            // .catch((err) => console.log(err));
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
