'use client'
import React from 'react';
import styles from './nav.module.css';

export default function Nav() {
  const user = localStorage.getItem('user');
  console.log(user);
  
  return (
    <div className={styles.nav}>
      <h1>
        Ravens
      </h1>
      <div className={styles.navRight}>
        {user ? <>
          <h3>{JSON.parse(user).username}</h3>
          <h2>Logout</h2> 
        </>
          : <>
          <h2>Login</h2>
          <h2> | </h2>
          <h2>Signup</h2>
        </>}
      </div>
    </div>
  )
};