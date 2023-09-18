'use client'
import { AuthContext, User, AuthContextType, errorType, UserInfo } from '@/context/authContext';
import React, { useState, useEffect, useContext } from 'react';
import ErrorModal from '@/components/ErrorModal';
import { GetUsername, GetPassword } from './authUtils';

export function Login(): React.FunctionComponentElement<HTMLBodyElement> {
  const [isValid, setIsValid] = useState(false);
  const authContext = useContext(AuthContext) as AuthContextType;

  const {
    userInfo,
    updateUserInfo,
    loginUser,
    loginError,
    isLoading,
    setLoginError,
  } = authContext;
  
  // Switch to next route
  const handleNext = () => {
    setIsValid(true);
  }

   const handleCloseError = () => {
    setLoginError(null);
  };

  const handleUser = () => {
    loginUser();
  }

  useEffect(() => {
  }, [isValid]);

  return (
    <div>
      {!isValid ? (
        <GetUsername
          userInfo={userInfo}
          setUsername={updateUserInfo}
          setIsValid={handleNext}
          isRegister={false}
        />
      ) : (
        <GetPassword
          userInfo={userInfo}
          setPassword={updateUserInfo}
          handleUser={handleUser}
          isRegister={false}
          isLoading={isLoading}
        />
      )}

      {
        loginError && loginError.error && 
        <ErrorModal onClose={handleCloseError} errorMessage={loginError.message} />
      }
    </div>
  )
}