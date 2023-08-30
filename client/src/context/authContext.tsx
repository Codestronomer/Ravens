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
  _id: string
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
  setRegisterError: Dispatch<SetStateAction<errorType>> | Dispatch<SetStateAction<null>>
  registerError: errorType | null
  isLoading: boolean
}

// Define auth context
export const AuthContext: React.Context<AuthContextType | {}> = createContext({});

export const AuthContextProvider = (
    { children }: { children: React.ReactNode}
  ) => {
  const [user, setUser] = useState<User>({
    _id: "",
    token: "",
    username: "",
  });
  const [registerError, setRegisterError] = useState(null);
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
  }, [userInfo]);

  const contextValue: AuthContextType = {
    user,
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