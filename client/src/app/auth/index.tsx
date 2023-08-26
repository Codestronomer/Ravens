'use client'
import { AuthContext, User, AuthContextType } from '@/context/authContext';
import styles from './auth.module.css';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface userNameProps {
  userInfo: User
  handleSubmit: Function,
  setUsername: Function,
  setIsValid: Dispatch<SetStateAction<boolean>>
}

interface passwordProps {
  userInfo: User
  handleSubmit: Function,
  setPassword: Function,
}

export function Login(): React.FunctionComponentElement<HTMLBodyElement> {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within AuthContext.Provider');
  }

  const { userInfo, updateUserInfo, registerUser, registerError } = authContext;

  const handleSubmit = () => {
    registerUser(userInfo);
    router.push('/chat');
  }
  
  // Switch to next route
  const handleNext = () => {
    setIsValid(true);
  }

  useEffect(() => {
    console.log('Hey');
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
          handleSubmit={handleSubmit}
        />
      }
    </div>
  )
}

const GetUsername: React.FC<userNameProps> = ({ handleSubmit, setUsername, userInfo }) => {

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername({ ...userInfo, username: e.target.value });
  }

  return <div className={styles.auth}>
    <p className={styles.description}>Set a username to get started</p>
    <input 
      className={styles.userInput}
      required={true}
      placeholder='Username'
      onChange={(e) => handleUsername(e)}
    >
    </input>
    <button className={styles.userSubmit} onClick={() => handleSubmit()}>Enter</button>
  </div>

}

const GetPassword: React.FC<passwordProps> = ({ handleSubmit, setPassword, userInfo }) => {

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({...userInfo, password: e.target.value});
  }

  return (
    <div className={styles.auth}>
      <p className={styles.description}>Enter a strong password to continue</p>
      <form>
        <input
        className={styles.userInput}
        placeholder='Password'
        required={true}
        type='password'
        onChange={handlePassword}
        />
      </form>
      <button className={styles.userSubmit} onClick={() => handleSubmit()}>Create Account</button>
    </div>
  )
}
