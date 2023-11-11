'use client'
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AuthContext, AuthContextType } from "@/context/authContext";
import { Auth } from "./auth";
import styles from './auth.module.css';


export function AuthenticationMain() {
  const [parent] = useAutoAnimate();
  const { isSuccessful, user, logout } = useContext(AuthContext) as AuthContextType;
  const [isRegister, setIsRegister] = useState<boolean>(false); // Rename isLogin to isRegister

  // Toggle between register and login
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRegister(!isRegister);
  }

  return (
    <div ref={parent}>
      {/* Check if user is successfully authenticated or has a username */}
      {isSuccessful || user.username.length > 2 ? (
        <div className={styles.formInfo} ref={parent}>
           {/* Display welcome message and continue button */}
          <h3 className={styles.welcome}>{isRegister ? `Welcome ${user?.username}👋` : `Welcome back, ${user?.username}`}</h3>
          <a href={isRegister ? "appearance" : "chat"}>
            <button className={styles.userSubmit}>
              {isRegister ? 'Continue' : 'Continue to Chat'}
            </button>
          </a>
          <div className={styles.logoutLink} onClick={() => logout()}>
            Logout
          </div>
        </div>
      ) : (
        // User is not authenticated or registered
        <>
          <Auth isRegister={isRegister} /> {/* Use the Auth component with isRegister prop */}
          <div className={styles.authSwitch} onClick={handleClick}>
            {
              isRegister ? 
              <div className={styles.authSwitchText}>
                <div>{"Already have an account?"}</div>
                {/* Switch text based on isRegister */}
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