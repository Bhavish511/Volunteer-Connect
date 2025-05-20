import Navbar from "../components/layout/Navbar"
import "./AboutPage.css"
import Footer from "../components/layout/Footer"

const AboutPage = () => {
  
  return (
    <div className="App">
      <Navbar />
      <main className="page-container">
        <div className="about-hero">
          <div className="container">
            <h1 className="about-hero-title">About VolunteerConnect</h1>
            <p className="about-hero-subtitle">
              Learn more about our mission, vision, and the team behind VolunteerConnect.
            </p>
          </div>
        </div>

        {/* Our Mission and Vision */}
        <section className="about-section">
          <div className="container">
            <div className="mission-vision-container">
              <div className="mission-vision-card mission-card">
                <h2 className="mission-vision-title">Our Mission</h2>
                <p className="mission-vision-text">
                  Our mission is to create a world where volunteering is accessible to everyone and organizations can
                  easily find the help they need. We believe in the power of community and collaboration to solve
                  problems and create positive change.
                </p>
              </div>
              <div className="mission-vision-card vision-card">
                <h2 className="mission-vision-title">Our Vision</h2>
                <p className="mission-vision-text">
                  We envision a future where every individual can contribute their skills and time to causes they care
                  about, and where organizations have the resources they need to make a meaningful impact in their
                  communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="about-section about-section-alt">
          <div className="container">
            <div className="about-content">
              <div className="about-content-header">
                <h2 className="about-content-title">Our Story</h2>
              </div>
              <div className="about-content-body">
                <p className="about-text">
                  VolunteerConnect was founded in 2020 by a group of tech professionals who saw a gap in how volunteers
                  and organizations connected with each other. They noticed that many skilled individuals wanted to
                  volunteer their time but didn't know where to start, while organizations struggled to find volunteers
                  with the specific skills they needed.
                </p>
                <p className="about-text">
                  The team set out to create a platform that would make it easy for volunteers to find opportunities
                  that matched their skills and interests, and for organizations to connect with qualified volunteers
                  who could help them achieve their goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-content-header">
                <h2 className="about-content-title">Our Values</h2>
              </div>
              <div className="about-content-body">
                <ul className="about-values">
                  <li className="about-value">
                    <strong>Community:</strong> We believe in the power of community and collaboration to create
                    positive change.
                  </li>
                  <li className="about-value">
                    <strong>Impact:</strong> We are committed to making a meaningful impact in the lives of volunteers
                    and the organizations they serve.
                  </li>
                  <li className="about-value">
                    <strong>Innovation:</strong> We are constantly innovating to improve our platform and make it easier
                    for volunteers and organizations to connect.
                  </li>
                  <li className="about-value">
                    <strong>Accessibility:</strong> We believe that volunteering should be accessible to everyone,
                    regardless of their background or location.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AboutPage
