"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { AuthContext } from "../context/AuthContext"

const SignUpPage = () => {
  const [userType, setUserType] = useState("volunteer")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    no_projects: "",
    bio: "",
    skills: "",
  })
  const [error, setError] = useState("")
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUserTypeChange = (type) => {
    setUserType(type)
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      no_projects: "",
      bio: "",
      skills: "",
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const payload =
        userType === "organization"
          ? {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              role: "organization",
              location: formData.location,
              no_projects: formData.no_projects,
            }
          : {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              role: "volunteer",
              location: formData.location,
              bio: formData.bio,
              skills: formData.skills, // comma-separated string
              no_projects: 0,
            }

      const response = await fetch(
        userType === "organization"
          ? `http://localhost:5000/registerorg`
          : `http://localhost:5000/registervolunteer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )
      console.log("sdfsdfsdfdsfdf");
      
      // if (!response.ok) {
      //   const errorText = await response.text()
      //   throw new Error(errorText || "Registration failed")
      // }
      console.log("dfgfgdgg");
      

      const data = await response.json()
      const token = data.authtoken
      console.log(token);
      

      localStorage.setItem("token", token)

      const user = {
        id: Date.now().toString(),
        name: formData.username,
        email: formData.email,
      }

      register(user, userType, token)

      navigate(userType === "volunteer" ? "/volunteer/dashboard" : "/organization/dashboard")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="App">
      <Navbar />
      <main className="page-container">
        <div className="auth-container bg-white">
          <h1 className="text-2xl font-bold text-center mb-6">Create Your VolunteerConnect Account</h1>

          {/* User Type Selection */}
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 text-center ${
                userType === "volunteer" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleUserTypeChange("volunteer")}
            >
              Volunteer
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                userType === "organization" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleUserTypeChange("organization")}
            >
              Organization
            </button>
          </div>

          {error && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                {userType === "organization" ? "Organization Name" : "Full Name"}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Volunteer: Bio + Skills */}
            {userType === "volunteer" && (
              <>
                <div className="mb-4">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Skills <span className="text-gray-500 text-sm">(comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    placeholder="e.g. React, Node.js, UI Design"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            )}

            {/* Organization: Number of Projects */}
            {userType === "organization" && (
              <div className="mb-6">
                <label htmlFor="no_projects" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Projects
                </label>
                <input
                  type="number"
                  id="no_projects"
                  name="no_projects"
                  value={formData.no_projects}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 hover:text-blue-800">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SignUpPage
