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
  image: string
}

export interface UserInfo {
  username: string
  password: string
}

export interface ErrorType {
  error: boolean
  message: string
}

// Define the auth context type
export interface AuthContextType {
  user: User;
  isLoading: boolean;
  userInfo: UserInfo;
  logout: () => void;
  isSuccessful: boolean;
  isValidUsername: boolean;
  loginError: ErrorType | null;
  registerError: ErrorType | null;
  loginUser: (userInfo: UserInfo) => Promise<boolean>;
  updateUserInfo: (info: UserInfo) => void;
  registerUser: (userInfo: UserInfo) => void;
  checkIsValidUsername: (username: string) => void;
  setLoginError: (error: ErrorType | null) => void;
  setRegisterError: (error: ErrorType | null) => void;
}

// Define auth context
export const AuthContext: React.Context<AuthContextType | {}> = createContext({});

export const AuthContextProvider = (
    { children }: { children: React.ReactNode}
  ) => {
  const [user, setUser] = useState<User>({
    id: "",
    image: "",
    token: "",
    username: "",
  });
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    password: ""
  });

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [loginError, setLoginError] = useState<ErrorType | null>(null);
  const [registerError, setRegisterError] = useState<ErrorType | null>(null);

  // update user info state
  const updateUserInfo = useCallback((info: UserInfo) => {
    setUserInfo(info);
  }, []);

  // Function to register user
  const registerUser = useCallback(async (userInfo: UserInfo) => {
    setIsLoading(true);
    setRegisterError(null);

    try {
      const response = await axiosPost(`${baseUrl}/users/register`, userInfo);

      // Check for errors
      if (response?.error) {
        setRegisterError(response);
      } else {
        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
        setIsSuccessful(true);
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setRegisterError, setUser]);

  // Function to login user
  const loginUser = useCallback(async (userInfo: UserInfo) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await axiosPost(`${baseUrl}/users/login`, userInfo);

      // Check for errors
      if (response?.error) {
        setLoginError(response);
        return false;
      } else {
        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
        setIsSuccessful(true);
        return true;
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setLoginError, setUser, ]);

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

  const logout = () => {
    localStorage.setItem('user', "");
    setUser({ id: "",
      image: "",
      token: "",
      username: "",
    });
  }

  // Get persisted user data from local storage when the component mounts
  useEffect(() => {
    const persistedUser = localStorage.getItem('user');
    if (persistedUser) {
      setUser(JSON.parse(persistedUser));
    }
  }, []);

  const contextValue: AuthContextType = {
    user,
    logout,
    userInfo,
    isLoading,
    loginUser,
    loginError,
    registerUser,
    isSuccessful,
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