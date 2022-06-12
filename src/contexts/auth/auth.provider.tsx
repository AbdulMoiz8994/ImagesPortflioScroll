import React, { useReducer, useState } from 'react';
import { useEffect } from 'react';
import { getCustomerFromLocalStorage } from 'services/customer';
import { AuthContext } from './auth.context';
const isBrowser = typeof window !== 'undefined';
const INITIAL_STATE = {
  // isAuthenticated: isBrowser && !!localStorage.getItem('access_token'),
  isAuthenticated: isBrowser && !!localStorage.getItem('customer'),
  customer: (isBrowser && localStorage.getItem('customer')) || null,
  currentForm: 'signIn',
};

function reducer(state: any, action: any) {
  // console.log(state, 'auth');

  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        currentForm: 'signIn',
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
      };
    case 'SIGNUP':
      return {
        ...state,
        currentForm: 'signUp',
      };
    case 'FORGOTPASS':
      return {
        ...state,
        currentForm: 'forgotPass',
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  // const [customer, setCustomer] = useState(null);

  // useEffect(() => {
  //   setCustomer(getCustomerFromLocalStorage());
  // }, [])

  return (
    <AuthContext.Provider value={{ authState, authDispatch, customer: !authState.customer ? null : JSON.parse(authState.customer)  }}>
      {children}
    </AuthContext.Provider>
  );
};
