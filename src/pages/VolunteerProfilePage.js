"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { AuthContext } from "../context/AuthContext"

const VolunteerProfilePage = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const { email } = useParams() // The email is extracted from the URL parameter

  const [volunteer, setVolunteer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin")
      return
    }

    const fetchVolunteerProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:5000/viewprofile/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        // if (!response.ok) {
        //   throw new Error("Failed to fetch volunteer profile.")
        // }

        const data = await response.json()

        // Format the request data into a suitable structure
        const formattedRequests = data.requestTitles.map((requestTitles, index) => ({
          id: data.requestIds[index],
          project: requestTitles,
          description: data.requestDescriptions[index],
          status: data.requestStatuses[index],
          date: new Date(data.requestDates[index]).toLocaleDateString(),
        }))

        setVolunteer({
          name: data.volunteerName,
          email: data.volunteerEmail,
          skills: data.volunteerSkills.split(", "), // Assuming skills are comma-separated
          organizations: data.organizationNames,
          requests: formattedRequests,
          location: data.volunteerLocation,
          bio: data.volunteerBio,
          noProjects: data.no_projects,
        })
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchVolunteerProfile()
  }, [currentUser, email, navigate])

  if (!currentUser) {
    navigate("/signin")
    return null
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading profile...</div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">{error}</div>
    )
  }

  return (
    <div className="App">
      <Navbar />
      <main className="page-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Volunteer Profile</h1>

          {/* Volunteer Profile Information */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <p><strong>Name:</strong> {volunteer.name}</p>
              <p><strong>Email:</strong> {volunteer.email}</p>
              <p><strong>Skills:</strong> {volunteer.skills.join(" , ")}</p>
              <p><strong>Organizations:</strong> {volunteer.organizations.join(", ")}</p>
              <p><strong>Projects Completed:</strong> {volunteer.noProjects}</p>
              <p><strong>Location:</strong> {volunteer.location || "Not provided"}</p>
              <p><strong>Bio:</strong> {volunteer.bio || "Not provided"}</p>
            </div>
          </div>

          {/* Volunteer Requests */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Volunteer Work</h2>

            {volunteer.requests.length > 0 ? (
              <div className="space-y-4">
                {volunteer.requests.map((request) => (
                  <div key={request.id} className="border p-4 rounded-md">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <h4 className="font-medium text-lg">{request.project}</h4>
                        <p className="text-sm text-gray-600 mb-2">Description: {request.description}</p>
                        <p className="text-xs text-gray-500">Requested on: {request.date}</p>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No requests yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default VolunteerProfilePage
