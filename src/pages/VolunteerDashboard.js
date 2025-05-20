"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { AuthContext } from "../context/AuthContext"

const VolunteerDashboard = ({ section = "dashboard" }) => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5000/volunteerDashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include"
        })
        console.log("dfdsfsfsdf");
        
        const data = await res.json()
        console.log("fsfsf");
        
        setProfile({
          name: data.volunteerName,
          email: data.volunteerEmail,
          skills: data.volunteerSkills, // updated here
          location: data.volunteerLocation,
          bio: data.volunteerBio,
        })

        const parsedRequests = data.requestIds.map((id, index) => ({
          id: String(id),
          organization: data.organizationNames[index],
          project: data.requestTitles[index],
          description: data.requestDescriptions[index],
          status: data.requestStatuses[index].toLowerCase(),
          date: new Date(data.requestDates[index]).toLocaleDateString(),
          rawDate: new Date(data.requestDates[index]) // for sorting
        }))

        const sortedRequests = parsedRequests.sort((a, b) => b.rawDate - a.rawDate)

        setRequests(sortedRequests)
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
        navigate("/signin")
      }
    }

    if (localStorage.getItem("token")) {
      fetchDashboardData()
    } else {
      navigate("/signin")
    }
  }, [currentUser, navigate])

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      username: profile.name,
      skills: profile.skills.trim(), // updated here
      location: profile.location,
      bio: profile.bio,
    };

    try {
      const res = await fetch("http://localhost:5000/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });
      console.log("dsfdf");
      
      // const data = await res.json();
      console.log("dsfdf");
      
      alert("Profile updated successfully!");
      // console.log("Updated Profile:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  }

  const handleRequestAction = async (id, action) => {
    const newStatus = action === "accept" ? "Accepted" : "Rejected"

    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus.toLowerCase() } : req
      )
    )

    try {
      const res = await fetch(`http://localhost:5000/updaterequest/${newStatus}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await res.json()
      console.log("Request updated:", result)
    } catch (error) {
      console.error("Error updating request:", error)
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="App">
      <Navbar />
      <main className="dashboard-container flex">
        <div className="dashboard-sidebar w-64 bg-gray-100 h-full p-4">
          <h2 className="text-xl font-bold mb-4">Volunteer Dashboard</h2>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-3">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium">{profile.name}</h3>
              <p className="text-sm text-gray-600">Volunteer</p>
            </div>
          </div>
          <nav>
            <Link to="/volunteer/dashboard" className={`block px-4 py-2 ${section === "dashboard" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"}`}>
              Dashboard
            </Link>
            <Link to="/volunteer/profile" className={`block px-4 py-2 ${section === "profile" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"}`}>
              My Profile
            </Link>
            <Link to="/volunteer/requests" className={`block px-4 py-2 ${section === "requests" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"}`}>
              Requests
            </Link>
          </nav>
        </div>

        <div className="dashboard-content flex-1 p-6 bg-gray-50">
          {section === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Welcome, {profile.name}!</h1>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-bold mb-4">Your Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.split(",").map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-bold mb-4">Recent Requests</h2>
                {requests.length > 0 ? (
                  <div className="space-y-4">
                    {requests.slice(0, 3).map((request) => (
                      <div key={request.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{request.project}</h3>
                            <p className="text-sm text-gray-600">{request.organization}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            request.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                            request.status === "accepted" ? "bg-green-100 text-green-700" :
                            request.status === "completed" ? "bg-blue-100 text-blue-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm mt-2">{request.description}</p>
                      </div>
                    ))}
                    <div className="mt-4">
                      <Link to="/volunteer/requests" className="text-blue-600 hover:text-blue-800 text-sm">
                        View all requests →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">No recent requests.</p>
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Performance Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-md text-center">
                    <h3 className="text-3xl font-bold text-blue-700">{requests.length}</h3>
                    <p className="text-sm text-gray-600">Total Requests</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md text-center">
                    <h3 className="text-3xl font-bold text-green-700">
                      {requests.filter((r) => r.status === "accepted").length}
                    </h3>
                    <p className="text-sm text-gray-600">Accepted Projects</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === "profile" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">My Profile</h1>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows="4"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      value={profile.skills}
                      onChange={(e) =>
                        setProfile({ ...profile, skills: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          )}

          {section === "requests" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Volunteer Requests</h1>
              <div className="bg-white p-6 rounded-lg shadow-md">
                {["pending", "accepted"].map((status) => (
                  <div key={status} className="mb-6">
                    <h2 className="text-lg font-bold capitalize mb-2">{status} Requests</h2>
                    {requests.filter((r) => r.status === status).length > 0 ? (
                      <div className="space-y-4">
                        {requests
                          .filter((r) => r.status === status)
                          .map((req) => (
                            <div key={req.id} className="border p-4 rounded-md">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium">{req.organization}</h3>
                                  <p className="text-sm text-gray-600">{req.project}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                                }`}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                              </div>
                              <p className="text-sm mb-2">{req.description}</p>
                              <p className="text-xs text-gray-500">Date: {req.date}</p>
                              {status === "pending" && (
                                <div className="flex space-x-2 mt-2">
                                  <button
                                    onClick={() => handleRequestAction(req.id, "accept")}
                                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-md text-sm"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => handleRequestAction(req.id, "decline")}
                                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm"
                                  >
                                    Decline
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No {status} requests.</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default VolunteerDashboard
