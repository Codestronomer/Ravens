'use client'
import { AuthContext, User, AuthContextType } from '@/context/authContext';
import React, { useState, useEffect, useContext, SetStateAction } from 'react';
import ErrorModal from '@/components/ErrorModal';
import { GetUsername, GetPassword } from './authUtils';
import styles from './auth.module.css';

export function Register(): React.FunctionComponentElement<HTMLBodyElement> {
  const [isValid, setIsValid] = useState(false);
  const authContext = useContext(AuthContext) as AuthContextType;

  const {
    userInfo,
    updateUserInfo,
    registerUser,
    registerError,
    isLoading,
    setRegisterError,
  } = authContext;
  
  // Switch to next route
  const handleNext = () => {
    setIsValid(true);
  }

   const handleCloseError = () => {
    setRegisterError(null as any);
  };

  useEffect(() => {
  }, [isValid]);

  return (
    <div>
      {!isValid ? <GetUsername
        userInfo={userInfo}
        setUsername={updateUserInfo}
        setIsValid={setIsValid}
        handleSubmit={handleNext}
        isRegister={true}
        /> : <GetPassword
          userInfo={userInfo}
          setPassword={updateUserInfo}
          registerUser={registerUser}
          isLoading={isLoading}
        />
      }

      {
        registerError && registerError?.error && 
        <ErrorModal onClose={handleCloseError} errorMessage={registerError?.message} />
      }
    </div>
  )
}