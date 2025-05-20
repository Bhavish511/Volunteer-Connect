// REMOVE all request-fetching and request-rendering logic

"use client"

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { AuthContext } from "../context/AuthContext"

const OrganizationDashboard = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin")
      return
    }

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:5000/organizationdashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()

        const seen = new Set()
        const uniqueVolunteers = []
        for (let i = 0; i < data.vemail.length; i++) {
          if (!seen.has(data.vemail[i])) {
            seen.add(data.vemail[i])
            uniqueVolunteers.push({
              name: data.vusername[i],
              email: data.vemail[i],
              skills: data.vskills[i].split(",").map(skill => skill.trim()),
              projects: data.vno_projects[i],
            })
          }
        }

        setDashboardData({
          activeRequests: data.no_requests,
          completedProjects: data.no_projects,
          totalVolunteers: data.no_volunteers,
          volunteers: uniqueVolunteers,
        })
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [currentUser, navigate])

  if (!currentUser || loading || !dashboardData) {
    return <div className="text-center py-20 text-gray-500">Loading dashboard...</div>
  }

  return (
    <div className="App">
      <Navbar />
      <main className="page-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Organization Dashboard</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Active Requests</h2>
              <p className="text-3xl font-bold text-blue-600">{dashboardData.activeRequests}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Completed Projects</h2>
              <p className="text-3xl font-bold text-green-600">{dashboardData.completedProjects}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Volunteers</h2>
              <p className="text-3xl font-bold text-purple-600">{dashboardData.totalVolunteers}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/chatbot")}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium"
              >
                Find Volunteers
              </button>
              <button
                onClick={() => navigate("/organization/requests")}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium"
              >
                Manage Requests
              </button>
              <button
                onClick={() => navigate("/organization/post-request")}
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-medium"
              >
                Post Request to Volunteer
              </button>
            </div>
          </div>


          {/* Recent Volunteers */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Volunteers</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.volunteers.map((vol, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{vol.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {vol.skills.map((skill, i) => (
                            <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{ skill }</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{vol.projects}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => navigate(`/volunteer/${encodeURIComponent(vol.email)}`)}
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

                  {/* Upcoming Projects */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Projects</h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-md">
                <h3 className="font-medium text-lg mb-1">Website Redesign</h3>
                <p className="text-sm text-gray-600 mb-2">Deadline: June 30, 2023</p>
                <p className="text-sm mb-3">
                  We need to redesign our website to make it more user-friendly and mobile-responsive.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs mr-2">
                      Web Development
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">UI/UX Design</span>
                  </div>
                </div>
              </div>
              <div className="border p-4 rounded-md">
                <h3 className="font-medium text-lg mb-1">Social Media Campaign</h3>
                <p className="text-sm text-gray-600 mb-2">Deadline: July 15, 2023</p>
                <p className="text-sm mb-3">
                  We need help creating and managing a social media campaign for our upcoming fundraising event.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs mr-2">Social Media</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Content Creation</span>
                  </div>
                </div>
              </div>
              <div className="border p-4 rounded-md">
                <h3 className="font-medium text-lg mb-1">Database Management</h3>
                <p className="text-sm text-gray-600 mb-2">Deadline: August 1, 2023</p>
                <p className="text-sm mb-3">
                  We need help organizing and managing our donor database to improve our fundraising efforts.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs mr-2">Data Analysis</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      Database Management
                    </span>
                  </div>
                </div>
              </div>
              </div>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default OrganizationDashboard
