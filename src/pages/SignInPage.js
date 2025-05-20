"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { AuthContext } from "../context/AuthContext"

const SignInPage = () => {
  const [userType, setUserType] = useState("volunteer")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleUserTypeChange = (type) => {
    setUserType(type)
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const loginEndpoint =
      userType === "organization"
        ? "http://localhost:5000/organizationlogin"
        : "http://localhost:5000/volunteerlogin"

    try {      
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      // if (!response.ok) {
      //   const errMsg = await response.json()
      //   throw new Error(errMsg || "Login failed")
      // }

      const date1 = await response.json()
      const token = date1.authtoken;
      // Store token
      localStorage.setItem("token", token)
      console.log(token);

      const user = {
        id: Date.now().toString(),
        name: formData.email.split("@")[0],
        email: formData.email,
      }

      // Save user context
      login(user, userType, token)
      
      // Redirect based on role
      navigate(
        userType === "volunteer"
          ? "/volunteer/dashboard"
          : "/organization/dashboard"
      )
    } catch (error) {
      setError("Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="App">
      <Navbar />
      <main className="page-container">
        <div className="auth-container bg-white">
          <h1 className="text-2xl font-bold text-center mb-6">
            Sign In to VolunteerConnect
          </h1>

          {/* User Type Selection */}
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 text-center ${
                userType === "volunteer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleUserTypeChange("volunteer")}
            >
              Volunteer
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                userType === "organization"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleUserTypeChange("organization")}
            >
              Organization
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default SignInPage
