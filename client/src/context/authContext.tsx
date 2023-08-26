'use client'
import { axiosPost } from '@/services/backend';
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

// Define the auth context type
export interface AuthContextType {
  userInfo: User
  updateUserInfo: Function
  registerUser: Function
  registerError: Dispatch<SetStateAction<string>> | null
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
  const registerUser = useCallback(async (info: User) => {
    setIsLoading(true);
    setRegisterError(null);
    const response = await axiosPost('/api/login', JSON.stringify(info));

    // if request returned an error
    if (response?.error) {
      return setRegisterError(response.error);
    }
    
    // save user information
    localStorage.setItem('user', JSON.stringify(response));
    setUser(response);
  }, []);

  const contextValue: AuthContextType = {
    userInfo,
    updateUserInfo,
    registerUser,
    registerError,
  }

  return (
    <AuthContext.Provider
      value={contextValue}
    >
    {children}
    </AuthContext.Provider>
  )
}