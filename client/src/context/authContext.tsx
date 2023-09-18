'use client'
import { axiosPost, baseUrl } from '@/services/backend';
import React, { 
  useState,
  useEffect,
  useCallback,
  createContext,
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
  setLoginError: (error: errorType | null) => void;
  setRegisterError: (error: errorType | null) => void;
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
  const [registerError, setRegisterError] = useState<errorType | null>(null);
  const [loginError, setLoginError] = useState<errorType | null>(null);
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

    const response = await axiosPost(`${baseUrl}/users/register`, userInfo);
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

    const response = await axiosPost(`${baseUrl}/users/login`, userInfo);

    // if request returned an error
    if (response?.error) {
      setIsLoading(false);
      return setLoginError(response);
    }

    
    // save user information
    localStorage.setItem('user', JSON.stringify(response));
    setUser(response);
    setIsLoading(false);
  }, [userInfo]);

  // Get persisted user data from local storage when the component mounts
  useEffect(() => {
    const persistedUser = localStorage.getItem('user');
    if (persistedUser) {
      setUser(JSON.parse(persistedUser));
    }
  }, []);

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