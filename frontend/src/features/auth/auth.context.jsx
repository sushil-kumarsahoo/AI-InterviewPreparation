import { createContext, useState, useMemo } from "react";



export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)


     const contextValue = useMemo(() => ({
    user,
    setUser,
    loading,
    setLoading
  }), [user, loading]);


   return (
    <AuthContext.Provider value={contextValue} >
        {children}
    </AuthContext.Provider>
   )

}