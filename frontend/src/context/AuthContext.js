/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import axios from "axios";
import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  loggedIn: false
};
const authContext = createContext(initialState);
const { Provider } = authContext;

const AuthProvider = ({ children }) => {
  
  useEffect(() => {
    axios.defaults.headers.common.authorization = localStorage.getItem('token')
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    if(token)
    {
      dispatch({ type: "LOG_IN" });
    }
    else{
      dispatch({ type: "LOG_OUT" });
    }
    // axios
    //   .get("/users/autoLogin")
    //   .then(() => {
    //     dispatch({ type: "LOG_IN" });
    //   })
    //   .catch(() => {
    //     dispatch({ type: "LOG_OUT" });
    //   });
    return () => {
    };
  }, []);

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOG_IN":
        return { ...state, loggedIn: true };
      case "LOG_OUT":
        return { ...state, loggedIn: false };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authContext, AuthProvider };
