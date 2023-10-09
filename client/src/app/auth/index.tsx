'use client'
import React, { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import styles from './auth.module.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';


export function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [parent] = useAutoAnimate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsLogin(!isLogin);
  }

  return (
    <div ref={parent}>
      <h2 className={styles.welcome}>Welcome 👋</h2>
      { isLogin ? <Login /> : <Register />}
      <p className={styles.authSwitch} onClick={handleClick}>{
          isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"
        }
      </p>
    </div>
  )
}
