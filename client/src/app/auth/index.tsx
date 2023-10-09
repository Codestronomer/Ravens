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
      { isLogin ? <Login /> : <Register />}
      <p className={styles.authSwitch} onClick={handleClick}>{
          isLogin ? 
          <div className={styles.authSwitchText}>
            <div>{"Don't have an account?"}</div>
            <div className={styles.authSwitchTextMain}>{"Sign up"}</div>
          </div>
          : 
          <div className={styles.authSwitchText}>
            <div>
              {"Already have an account?"}
            </div>
            <div className={styles.authSwitchTextMain}>{"Login"}</div>
          </div>
        }
      </p>
    </div>
  )
}
