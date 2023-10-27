'use client'
import React, { useContext, useState } from "react";
import { Auth } from "./auth";
import styles from './auth.module.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AuthContext, AuthContextType } from "@/context/authContext";
import Link from "next/link";


export function AuthenticationMain() {
  const [parent] = useAutoAnimate();
  const { isSuccessful, user } = useContext(AuthContext) as AuthContextType;
  const [isRegister, setIsRegister] = useState<boolean>(false); // Rename isLogin to isRegister

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRegister(!isRegister); // Toggle between register and login
  }

  return (
    <div ref={parent}>
      {isSuccessful || user.username.length > 2 ?
        <div className={styles.formInfo}>
            {
              isRegister ? (
                <>
                  <h3 className={styles.welcome}>Welcome {user?.username}👋</h3>
                  <Link href="appearance">
                    <button className={styles.userSubmit}>
                      Continue
                    </button>
                  </Link>
                </>

              ) : (
                <>
                  <h3 className={styles.welcome}>Welcome back, {user?.username}👋</h3>
                  <Link href="chat">
                    <button className={styles.userSubmit}>
                      Continue to chat
                    </button>
                  </Link>
                </>
              )
            }
          </div>
        : (
        <>
          <Auth isRegister={isRegister} /> {/* Use the Auth component with isRegister prop */}
          <div className={styles.authSwitch} onClick={handleClick}>
            {
              isRegister ? 
              <div className={styles.authSwitchText}>
                <div>{"Already have an account?"}</div> {/* Switch text based on isRegister */}
                <div className={styles.authSwitchTextMain}>{"Login"}</div>
              </div>
              : 
              <div className={styles.authSwitchText}>
                <div>
                  {"Don't have an account?"}
                </div>
                <div className={styles.authSwitchTextMain}>{"Sign up"}</div>
              </div>
            }
          </div>
        </>)
      }
    </div>
  )
}