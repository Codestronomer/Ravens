'use client'
import { axiosGet, axiosPost, baseUrl } from '@/services/backend';
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
  isLoading: boolean
  userInfo: UserInfo
  loginUser: Function
  registerUser: Function
  updateUserInfo: Function
  isValidUsername: boolean
  loginError: errorType | null
  registerError: errorType | null
  checkIsValidUsername: (username: string) => void;
  setLoginError: (error: errorType | null) => void;
  setRegisterError: (error: errorType | null) => void;
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
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [loginError, setLoginError] = useState<errorType | null>(null);
  const [registerError, setRegisterError] = useState<errorType | null>(null);

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

  // check if User exists
  const checkIsValidUsername = useCallback(async (username: string) => {
    setLoginError(null);

    if (username) {
      console.log("here");
      const response = await axiosGet(`${baseUrl}/users/verify-username/${username}`);

      // if request returned an error
      if (response?.error) {
        return setLoginError(response);
      }

      setIsValidUsername(response.exists);
    }
  }, []);

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
    isValidUsername,
    setRegisterError,
    checkIsValidUsername,
  }

  return (
    <AuthContext.Provider
      value={contextValue}
    >
    {children}
    </AuthContext.Provider>
  )
}