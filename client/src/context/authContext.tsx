import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthContextProvider = (
    { children }: { children: React.ReactNode}
  ) => {
  const [user, setUser] = useState({
    username: "Charles"
  });

  return (
    <AuthContext.Provider
      value={
        user
      }
    >
    {children}
    </AuthContext.Provider>
  )
}