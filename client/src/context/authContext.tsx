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
  username: string
  password: string
}

interface errorType {
  error: boolean
  message: string
}

// Define the auth context type
export interface AuthContextType {
  userInfo: User
  updateUserInfo: Function
  registerUser: Function
  setRegisterError: Dispatch<SetStateAction<errorType>> | Dispatch<SetStateAction<null>>
  registerError: errorType | null
  isLoading: Boolean
}

// Define auth context
export const AuthContext: React.Context<AuthContextType | {}> = createContext({});

export const AuthContextProvider = (
    { children }: { children: React.ReactNode}
  ) => {
  const [user, setUser] = useState<User | {}>({});
  const [registerError, setRegisterError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    password: ""
  });

  // update user info state
  const updateUserInfo = useCallback((info: User) => {
    setUserInfo(info);
  }, []);

  // function to register user
  const registerUser = useCallback(async () => {
    setIsLoading(true);
    setRegisterError(null);

    const response = await axiosPost(`${baseUrl}/login`, userInfo);
    // if request returned an error
    if (response?.error) {
      return setRegisterError(response);
    }

    setIsLoading(false);

    console.log(response);
    
    // save user information
    localStorage.setItem('user', JSON.stringify(response));
    setUser(response);
  }, []);

  const contextValue: AuthContextType = {
    userInfo,
    isLoading,
    registerUser,
    registerError,
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