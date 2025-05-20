"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState(null) // 'volunteer' or 'organization'

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    const storedUserType = localStorage.getItem("userType")

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
      setUserType(storedUserType)
    }

    setLoading(false)
  }, [])

  const login = (user, type) => {
    // In a real app, this would involve API calls
    setCurrentUser(user)
    setUserType(type)
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("userType", type)
  }

  const logout = () => {
    setCurrentUser(null)
    setUserType(null)
    localStorage.removeItem("user")
    localStorage.removeItem("userType")
    localStorage.removeItem("token")
  }

  const register = (user, type) => {
    // In a real app, this would involve API calls
    setCurrentUser(user)
    setUserType(type)
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("userType", type)
  }

  const value = {
    currentUser,
    userType,
    login,
    logout,
    register,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
