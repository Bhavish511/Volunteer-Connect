import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

// Pages
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicePage from "./pages/ServicePage"
import ContactPage from "./pages/ContactPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import VolunteerDashboard from "./pages/VolunteerDashboard"
import OrganizationDashboard from "./pages/OrganizationDashboard"
import ChatbotInterface from "./pages/ChatbotInterface"
import RequestsPage from "./pages/RequestsPage"
import NotFoundPage from "./pages/NotFoundPage"
import VolunteerProfilePage from "./pages/VolunteerProfilePage"
import PostRequestPage from "./pages/PostRequestPage"

// Context
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer/profile" element={<VolunteerDashboard section="profile" />} />
          <Route path="/volunteer/requests" element={<VolunteerDashboard section="requests" />} />
          <Route path="/volunteer/performance" element={<VolunteerDashboard section="performance" />} />
          <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
          <Route path="/organization/requests" element={<RequestsPage />} />
          <Route path="/chatbot" element={<ChatbotInterface />} />
          <Route path="/volunteer/:email" element={<VolunteerProfilePage />} /> {/* Add this route */}
          <Route path="/organization/post-request" element={<PostRequestPage />} /> {/* New route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
