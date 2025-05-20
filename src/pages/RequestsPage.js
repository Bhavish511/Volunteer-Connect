"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { AuthContext } from "../context/AuthContext"

const RequestsPage = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [requests, setRequests] = useState([]) // This will hold the fetched data
  const [loading, setLoading] = useState(true) // Track loading state
  const [error, setError] = useState("") // Track any error

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin")
      return
    }

    // Fetch organization requests
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:9090/getorganizationrequests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })


        const data = await response.json()

        // Map the response to the format you need for requests
        const formattedRequests = data.requestTitles.map((title, index) => ({
          id: data.request_id[index],
          volunteer: data.vusername[index],
          email: data.vemail[index],
          skills: data.vskills[index].split(", "), // Assuming skills are comma-separated
          project: title,
          status: data.requestStatuses[index],
          date: new Date(data.requestDates[index]).toLocaleDateString(), // Format the date
        }))

        setRequests(formattedRequests) // Update the state with the formatted data
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchRequests()
  }, [currentUser, navigate])

  if (!currentUser) {
    navigate("/signin")
    return null
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading requests...</div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Volunteer Requests</h1>

          {/* Requests List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">All Requests</h2>

            {/* Pending Requests */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Requests</h3>
              {requests.filter((request) => request.status.toLowerCase() === "pending").length > 0 ? (
                <div className="space-y-4">
                  {requests
                    .filter((request) => request.status.toLowerCase() === "pending")
                    .map((request) => (
                      <div key={request.id} className="border p-4 rounded-md">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div>
                            <h4 className="font-medium text-lg">{request.volunteer}</h4>
                            <p className="text-sm text-gray-600 mb-2">Request Title: {request.project}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {request.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                                >
                                 Volunteer's Skills:  {skill}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">Requested on: {request.date}</p>
                          </div>
                          <div className="flex flex-col justify-center items-center gap-2 min-w-[120px]">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => navigate(`/volunteer/${encodeURIComponent(request.email)}`)}
                          >
                            View Profile
                          </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600">No pending requests.</p>
              )}
            </div>

            {/* Accepted Requests */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accepted Requests</h3>
              {requests.filter((request) => request.status.toLowerCase() === "accepted").length > 0 ? (
                <div className="space-y-4">
                  {requests
                    .filter((request) => request.status.toLowerCase() === "accepted")
                    .map((request) => (
                      <div key={request.id} className="border p-4 rounded-md">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div>
                            <h4 className="font-medium text-lg">{request.volunteer}</h4>
                            <p className="text-sm text-gray-600 mb-2">Request Title: {request.project}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {request.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                                >
                                 Volunteer's Skills: {skill}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">Accepted on: {request.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600">No accepted requests.</p>
              )}
            </div>

            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RequestsPage
