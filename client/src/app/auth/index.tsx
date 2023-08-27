'use client'
import { AuthContext, User, AuthContextType, errorType } from '@/context/authContext';
import styles from './auth.module.css';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import ErrorModal from '@/components/ErrorModal';

interface userNameProps {
  userInfo: User
  handleSubmit: Function,
  setUsername: Function,
  setIsValid: Dispatch<SetStateAction<boolean>>
}

interface passwordProps {
  userInfo: User
  registerUser: Function,
  setPassword: Function,
  isLoading: boolean,
}

export function Login(): React.FunctionComponentElement<HTMLBodyElement> {
  const router = useRouter();
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

const GetUsername: React.FC<userNameProps> = ({ handleSubmit, setUsername, userInfo }) => {

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername({ ...userInfo, username: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e?.preventDefault(); // Prevents the default form submission behavior
    handleSubmit();
  };

  return <>
    <form onSubmit={handleFormSubmit} className={styles.auth}>
      <label className={styles.description}>Enter a username to get started</label>
      <input 
        className={styles.userInput}
        required={true}
        placeholder='Username'
        onChange={(e) => handleUsername(e)}
      >
      </input>
      <button className={styles.userSubmit} type='submit'>Enter</button>
    </form>
  </>

}

const GetPassword: React.FC<passwordProps> = ({ registerUser, setPassword, userInfo, isLoading }) => {

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword({...userInfo, password: e.target.value});
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser();
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className={styles.auth}>
        <label className={styles.description}>Password</label>
        <input
        className={styles.userInput}
        placeholder='Enter a strong password'
        required={true}
        type='password'
        autoComplete='new-password'
        aria-autocomplete='list'
        onChange={handlePassword}
        />
        <button className={styles.userSubmit} type='submit'>{isLoading ? 'Creating Your Account' : 'Create Account'}</button>
      </form>
    </>
  )
}
