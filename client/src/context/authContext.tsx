'use client'
import { axiosPost, baseUrl } from '@/services/backend';
import React, { 
  useState,
  useCallback,
  createContext,
  SetStateAction,
  Dispatch
  } from 'react';

// Define user type
export interface User {
  id: string
  username: string
  token: string
}

export interface UserInfo {
  username: string
  password: string
}

export interface errorType {
  error: boolean
  message: string
}

// Define the auth context type
export interface AuthContextType {
  user: User
  userInfo: UserInfo
  updateUserInfo: Function
  registerUser: Function
  loginUser: Function
  setLoginError: Dispatch<SetStateAction<errorType>> | Dispatch<SetStateAction<null>>
  setRegisterError: Dispatch<SetStateAction<errorType>> | Dispatch<SetStateAction<null>>
  registerError: errorType | null
  loginError: errorType | null
  isLoading: boolean
}

// Define auth context
export const AuthContext: React.Context<AuthContextType | {}> = createContext({});

export const AuthContextProvider = (
    { children }: { children: React.ReactNode}
  ) => {
  const [user, setUser] = useState<User>({
    id: "",
    token: "",
    username: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    password: ""
  });

  // update user info state
  const updateUserInfo = useCallback((info: UserInfo) => {
    setUserInfo(info);
  }, []);

  // function to register user
  const registerUser = useCallback(async () => {
    setIsLoading(true);
    setRegisterError(null);

    const response = await axiosPost(`${baseUrl}/user/register`, userInfo);
    // if request returned an error
    if (response?.error) {
      return setRegisterError(response);
    }

    setIsLoading(false);

    console.log(response);
    
    // save user information
    localStorage.setItem('user', JSON.stringify(response));
    setUser(response);
  }, [userInfo]);

  // function to login user
  const loginUser = useCallback(async () => {
    setIsLoading(true);
    setLoginError(null);

    const response = await axiosPost(`${baseUrl}/user/login`, userInfo);

    // if request returned an error
    if (response?.error) {
      return setLoginError(response);
    }

    setIsLoading(false);
    
    // save user information
    localStorage.setItem('user', JSON.stringify(response));
    setUser(response);
  }, [userInfo])

  const contextValue: AuthContextType = {
    user,
    userInfo,
    isLoading,
    loginUser,
    loginError,
    registerUser,
    registerError,
    setLoginError,
    updateUserInfo,
    setRegisterError,
  }

  return (
    <AuthContext.Provider
      value={contextValue}
    >
    {children}
    </AuthContext.Provider>
  )
}