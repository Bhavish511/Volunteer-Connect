"use client"

import { useState, useRef, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { AuthContext } from "../context/AuthContext"

const ChatbotInterface = () => {
  const { currentUser, userType } = useContext(AuthContext)
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm the VolunteerConnect chatbot. How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showVolunteerProfile, setShowVolunteerProfile] = useState(false)
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)
  const messagesEndRef = useRef(null)

  // Mock volunteer data
  const volunteers = [
    {
      id: "1",
      name: "Sarah Johnson",
      skills: ["Web Development", "Graphic Design", "UI/UX"],
      bio: "Experienced web developer with 5 years of experience in creating responsive websites and web applications.",
      projects: 12,
      rating: 4.8,
      reviews: [
        {
          id: "1",
          organization: "Community Food Bank",
          text: "Sarah did an excellent job redesigning our website. She was professional, responsive, and delivered high-quality work.",
          rating: 5,
        },
        {
          id: "2",
          organization: "Local School District",
          text: "Sarah helped us create a new website for our school. She was great to work with and understood our needs perfectly.",
          rating: 4.5,
        },
      ],
    },
    {
      id: "2",
      name: "Michael Chen",
      skills: ["Content Writing", "Social Media Management", "Marketing"],
      bio: "Marketing professional with expertise in content creation and social media management. Passionate about helping nonprofits increase their online presence.",
      projects: 8,
      rating: 4.6,
      reviews: [
        {
          id: "1",
          organization: "Environmental Nonprofit",
          text: "Michael created an excellent social media campaign for our beach cleanup event. Our engagement increased by 40%.",
          rating: 5,
        },
        {
          id: "2",
          organization: "Animal Shelter",
          text: "Michael helped us with our content strategy and social media management. He was responsive and delivered great results.",
          rating: 4.2,
        },
      ],
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      skills: ["Data Analysis", "Research", "Database Management"],
      bio: "Data analyst with a background in research and database management. Experienced in helping organizations make data-driven decisions.",
      projects: 5,
      rating: 4.9,
      reviews: [
        {
          id: "1",
          organization: "Healthcare Nonprofit",
          text: "Emily helped us analyze our patient data and provided valuable insights that improved our service delivery.",
          rating: 5,
        },
        {
          id: "2",
          organization: "Research Institute",
          text: "Emily was instrumental in organizing our research database. Her work was thorough and well-documented.",
          rating: 4.8,
        },
      ],
    },
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Check if user is logged in and is an organization
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin")
    } else if (userType !== "organization") {
      navigate("/")
    }
  }, [currentUser, userType, navigate])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Add user message
    const userMessage = { id: messages.length + 1, text: input, sender: "user" }
    setMessages([...messages, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      handleBotResponse(input)
      setIsTyping(false)
    }, 1000)
  }

  const handleBotResponse = (userInput) => {
    const userInputLower = userInput.toLowerCase()
    let botResponse

    // Simple keyword matching for demo purposes
    if (
      userInputLower.includes("web") ||
      userInputLower.includes("website") ||
      userInputLower.includes("development")
    ) {
      botResponse = {
        id: messages.length + 2,
        text: "I found some volunteers with web development skills. Here are the top matches:",
        sender: "bot",
        volunteers: volunteers.filter((v) => v.skills.some((s) => s.toLowerCase().includes("web"))),
      }
    } else if (
      userInputLower.includes("social media") ||
      userInputLower.includes("marketing") ||
      userInputLower.includes("content")
    ) {
      botResponse = {
        id: messages.length + 2,
        text: "I found some volunteers with social media and marketing skills. Here are the top matches:",
        sender: "bot",
        volunteers: volunteers.filter((v) =>
          v.skills.some(
            (s) =>
              s.toLowerCase().includes("social") ||
              s.toLowerCase().includes("content") ||
              s.toLowerCase().includes("marketing"),
          ),
        ),
      }
    } else if (
      userInputLower.includes("data") ||
      userInputLower.includes("analysis") ||
      userInputLower.includes("research")
    ) {
      botResponse = {
        id: messages.length + 2,
        text: "I found some volunteers with data analysis and research skills. Here are the top matches:",
        sender: "bot",
        volunteers: volunteers.filter((v) =>
          v.skills.some((s) => s.toLowerCase().includes("data") || s.toLowerCase().includes("research")),
        ),
      }
    } else if (userInputLower.includes("hello") || userInputLower.includes("hi") || userInputLower.includes("hey")) {
      botResponse = {
        id: messages.length + 2,
        text: "Hello! I'm here to help you find volunteers for your projects. What kind of skills are you looking for?",
        sender: "bot",
      }
    } else if (userInputLower.includes("help") || userInputLower.includes("how")) {
      botResponse = {
        id: messages.length + 2,
        text: "I can help you find volunteers based on the skills you need. Just tell me what kind of expertise you're looking for, such as 'web development', 'social media', 'data analysis', etc.",
        sender: "bot",
      }
    } else {
      botResponse = {
        id: messages.length + 2,
        text: "I'm not sure I understand what you're looking for. Could you please specify the skills or expertise you need? For example, 'web development', 'social media', 'data analysis', etc.",
        sender: "bot",
      }
    }

    setMessages((prevMessages) => [...prevMessages, botResponse])
  }

  const handleViewProfile = (volunteer) => {
    setSelectedVolunteer(volunteer)
    setShowVolunteerProfile(true)
  }

  const handleRequestVolunteer = () => {
    // In a real app, this would send a request to the volunteer
    alert(`Request sent to ${selectedVolunteer.name}!`)
    setShowVolunteerProfile(false)
  }

  if (!currentUser || userType !== "organization") {
    return null
  }

  return (
    <div className="App">
      <Navbar />
      <main className="page-container">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Volunteers</h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Chat Interface */}
            <div className="chatbot-container">
              {/* Messages */}
              <div className="chatbot-messages bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
                  >
                    <p>{message.text}</p>
                    {message.volunteers && (
                      <div className="mt-4 space-y-3">
                        {message.volunteers.map((volunteer) => (
                          <div key={volunteer.id} className="volunteer-card bg-white p-3 rounded-md">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{volunteer.name}</h3>
                                <div className="flex items-center mt-1">
                                  <div className="star-rating mr-1 text-sm">
                                    {"★".repeat(Math.round(volunteer.rating))}
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {volunteer.rating}/5 ({volunteer.projects} projects)
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleViewProfile(volunteer)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                              >
                                View Profile
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {volunteer.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="message bot-message">
                    <p>Typing...</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="bg-white p-4 border-t">
                <form onSubmit={handleSubmit} className="flex">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md">
                    Send
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-2">
                  Tip: Ask for volunteers with specific skills like "web development", "social media", or "data
                  analysis".
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Volunteer Profile Modal */}
      {showVolunteerProfile && selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedVolunteer.name}</h2>
                <button onClick={() => setShowVolunteerProfile(false)} className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="flex items-center mb-4">
                <div className="star-rating mr-2">{"★".repeat(Math.round(selectedVolunteer.rating))}</div>
                <span className="text-gray-600">
                  {selectedVolunteer.rating}/5 ({selectedVolunteer.projects} projects)
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVolunteer.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Bio</h3>
                <p className="text-gray-700">{selectedVolunteer.bio}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Reviews</h3>
                <div className="space-y-4">
                  {selectedVolunteer.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <div className="star-rating mr-2 text-sm">{"★".repeat(Math.round(review.rating))}</div>
                        <span className="text-sm text-gray-600">{review.rating}/5</span>
                      </div>
                      <p className="text-sm italic mb-1">"{review.text}"</p>
                      <p className="text-xs text-gray-500">- {review.organization}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowVolunteerProfile(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestVolunteer}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Request Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ChatbotInterface
