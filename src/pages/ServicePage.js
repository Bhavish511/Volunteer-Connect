import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"

const ServicePage = () => {

  
  return (
    <div className="App">
      <Navbar />
      <main className="page-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Learn about the innovative services we offer to connect volunteers with organizations.
            </p>
          </div>

          {/* How the Chatbot Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How the Chatbot Works</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Intelligent Matching</h3>
                  <p className="text-gray-700 mb-4">
                    Our chatbot uses advanced algorithms to match volunteers with organizations based on skills,
                    interests, availability, and location. The more you interact with the chatbot, the better it gets at
                    understanding your needs and preferences.
                  </p>
                  <p className="text-gray-700">
                    The chatbot asks questions to understand what you're looking for, whether you're a volunteer seeking
                    opportunities or an organization seeking help. It then provides personalized recommendations based
                    on your responses.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Natural Conversation</h3>
                  <p className="text-gray-700 mb-4">
                    Our chatbot is designed to feel like a natural conversation. You can ask questions, provide
                    information, and get recommendations in a way that feels intuitive and human-like.
                  </p>
                  <p className="text-gray-700">
                    The chatbot can understand complex queries and provide detailed responses. It can also handle
                    follow-up questions and remember context from earlier in the conversation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* List of Volunteer Expertise Areas */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Volunteer Expertise Areas</h2>
            <div className="bg-blue-50 p-8 rounded-lg">
              <p className="text-gray-700 mb-6">
                Our platform connects volunteers with a wide range of skills and expertise to organizations in need.
                Here are some of the expertise areas our volunteers offer:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">Technology</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Web Development</li>
                    <li>Mobile App Development</li>
                    <li>Data Analysis</li>
                    <li>IT Support</li>
                    <li>Cybersecurity</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">Marketing & Communications</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Social Media Management</li>
                    <li>Content Creation</li>
                    <li>Graphic Design</li>
                    <li>Public Relations</li>
                    <li>Email Marketing</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">Education</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Tutoring</li>
                    <li>Curriculum Development</li>
                    <li>Workshop Facilitation</li>
                    <li>Language Teaching</li>
                    <li>Educational Consulting</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">Business</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Strategic Planning</li>
                    <li>Financial Management</li>
                    <li>Human Resources</li>
                    <li>Project Management</li>
                    <li>Business Development</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">Health & Wellness</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Mental Health Support</li>
                    <li>Nutrition Counseling</li>
                    <li>Fitness Training</li>
                    <li>Healthcare Consulting</li>
                    <li>First Aid Training</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">Arts & Culture</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Photography</li>
                    <li>Music</li>
                    <li>Visual Arts</li>
                    <li>Writing & Editing</li>
                    <li>Event Planning</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Success Stories or Testimonials */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Michael Chen</h4>
                    <p className="text-gray-600">Web Developer Volunteer</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "I wanted to use my web development skills to help nonprofits, but I didn't know where to start.
                  VolunteerConnect's chatbot asked me about my skills and interests, and within minutes, I was connected
                  with a local environmental organization that needed help with their website. I've been volunteering
                  with them for six months now, and it's been an incredibly rewarding experience."
                </p>
                <div className="flex items-center">
                  <div className="star-rating mr-2">★★★★★</div>
                  <p className="text-gray-600">5/5 stars</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl mr-4">
                    H
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Homeless Shelter Network</h4>
                    <p className="text-gray-600">Nonprofit Organization</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Our organization was struggling to find volunteers with marketing expertise to help us raise
                  awareness about our services. We used VolunteerConnect's chatbot to describe our needs, and it matched
                  us with several qualified volunteers. One of them, a marketing professional, has been helping us
                  develop a social media strategy that has increased our visibility and donations by 40%."
                </p>
                <div className="flex items-center">
                  <div className="star-rating mr-2">★★★★★</div>
                  <p className="text-gray-600">5/5 stars</p>
                </div>
              </div>
            </div>
          </section>

          {/* Volunteer Signup Integration */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Volunteer Signup Integration</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Easy Registration</h3>
                  <p className="text-gray-700 mb-4">
                    Our platform makes it easy for volunteers to sign up and create a profile. Volunteers can specify
                    their skills, interests, availability, and location, which helps our chatbot make better matches.
                  </p>
                  <p className="text-gray-700">
                    Once registered, volunteers can browse opportunities, receive recommendations from the chatbot, and
                    connect with organizations directly through the platform.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Profile Management</h3>
                  <p className="text-gray-700 mb-4">
                    Volunteers can manage their profiles, update their information, and track their volunteer history
                    through our platform. They can also receive feedback and reviews from organizations they've worked
                    with.
                  </p>
                  <p className="text-gray-700">
                    Organizations can view volunteer profiles, including skills, experience, and reviews, to help them
                    make informed decisions about who to work with.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Behind the Chatbot */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Behind the Chatbot</h2>
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Natural Language Processing</h3>
                  <p className="text-gray-700">
                    Our chatbot uses advanced natural language processing (NLP) to understand user queries and provide
                    relevant responses. It can interpret complex language, recognize intent, and maintain context
                    throughout a conversation.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Machine Learning</h3>
                  <p className="text-gray-700">
                    The chatbot learns from each interaction to improve its recommendations over time. It uses machine
                    learning algorithms to analyze patterns and preferences, resulting in more accurate matches between
                    volunteers and organizations.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Matching Algorithm</h3>
                  <p className="text-gray-700">
                    Our proprietary matching algorithm considers multiple factors, including skills, interests,
                    location, availability, and past experiences, to create optimal matches between volunteers and
                    organizations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ServicePage
