'use client'
import React, { useContext, useEffect, useRef } from 'react';
import styles from './nav.module.css';
import { AuthContext, AuthContextType } from '@/context/authContext';
import { Theme } from '@/context/themeContext';
import { ThemeContextType } from '@/context';

export default function Nav() {

  const { user } = useContext(AuthContext) as AuthContextType;

  return (
    <div className={styles.nav}>
      <h1>
        Ravens
      </h1>
      <div className={styles.navRight}>
        {user && user.username ? <>
          <h3>{user.username}</h3>
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