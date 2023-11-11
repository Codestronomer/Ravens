'use client'
import { AuthContext, User, AuthContextType } from '@/context/authContext';
import React, { useState, useEffect, useContext } from 'react';
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
    setRegisterError(null);
  };

  useEffect(() => {
  }, [isValid]);

  return (
    <div className={styles.authComponent}>
      <div className={styles.formInfo}>
        <h2 className={styles.welcome}>Welcome 👋</h2>
        <p>Enter a username to get started</p>
      </div>
      <div className={styles.authForm}>
        <GetUsername
          userInfo={userInfo}
          setUsername={updateUserInfo}
          setIsValid={handleNext}
          isRegister={true}
        />
        <GetPassword
          isRegister={true}
          userInfo={userInfo}
          setPassword={updateUserInfo}
          handleUser={registerUser}
          isLoading={isLoading}
        />
        {
          registerError && registerError.error && 
          <ErrorModal onClose={handleCloseError} errorMessage={registerError.message} />
        }
      </div>
    </div>
  )
}