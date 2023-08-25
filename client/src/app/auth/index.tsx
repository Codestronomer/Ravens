'use client'
import styles from './auth.module.css';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface userNameProps {
  handleSubmit: Function,
  setUsername: Dispatch<SetStateAction<string>>
  setIsValid: Dispatch<SetStateAction<boolean>>
}

interface passwordNameProps {
  handleSubmit: Function,
  setPassword: Dispatch<SetStateAction<string>>
}

export function Login(): React.FunctionComponentElement<HTMLBodyElement> {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);


  const handleSubmit = () => {
    router.push('/chat');
  }

  const handleNext = () => {
    if (!username.length) {
      console.log("Input a valid username");
    }

    setIsValid(true);
  }

  useEffect(() => {
    console.log('Hey');
  }, [isValid]);

  return (
    <div>
      {!isValid ? <GetUsername 
        setUsername={setUsername}
        setIsValid={setIsValid}
        handleSubmit={handleNext}
        /> : <GetPassword
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      }
    </div>
  )
}

const GetUsername: React.FC<userNameProps> = ({ handleSubmit, setUsername }) => {

  const handleUsername = (e) => {
    e.preventDefault();

    setUsername(e.target.value);
  }

  return <div className={styles.auth}>
    <input 
      className={styles.userInput} 
      placeholder='Username'
      onChange={(handleUsername)}
    >
    </input>
    <button className={styles.userSubmit} onClick={() => handleSubmit()}>Enter</button>
  </div>

}

const GetPassword: React.FC<passwordNameProps> = ({ handleSubmit, setPassword }) => {

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value)
  }

  return (
    <div className={styles.auth}>
      <form>
        <input
        className={styles.userInput}
        placeholder='Password'
        type='password'
        onChange={handlePassword}
        />
      </form>
      <button className={styles.userSubmit} onClick={() => handleSubmit()}>Create Account</button>
    </div>
  )
}
