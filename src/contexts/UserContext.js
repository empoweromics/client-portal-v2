import { createContext, useReducer } from 'react';

export const setUser = 'setUser';
export const removeUser = 'removeUser';
const initialState = {
  user: (() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      user || {
        id: '',
        name: '',
        email: '',
        avatar: ''
      }
    );
  })()
};

function reducer(state, action) {
  switch (action.type) {
    case setUser: {
      return { ...initialState, user: action.payload };
    }
    //     case removeUser: {
    //       return initialState;
    //     }
    default:
      return state;
  }
}
export const UserContext = createContext(initialState);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
