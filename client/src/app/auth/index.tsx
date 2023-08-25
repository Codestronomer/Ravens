'use client'
import styles from './auth.module.css';
import React, { useState } from 'react';

export function Login() {
  const [username, setUsername] = useState('');

  const handleUsername = (e) => {
    e.preventDefault();

    setUsername(e.target.username);
  }

  const handleSumbit = () => {
    console.log(username);
  }
  return <div className={styles.auth}>
    <input 
      className={styles.userInput} 
      placeholder='Username'
      onClick={(handleUsername)}
    >
    </input>
    <button className={styles.userSubmit} onClick={() => handleSumbit }>Enter</button>
  </div>
}
