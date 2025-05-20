import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import "./HomePage.css";

const HomePage = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
    
  //   if (!token) {
  //     navigate("/signin");
  //   }
  // }, [navigate]);

  return (
    <div className="App">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Connect. Volunteer. Make a Difference.</h1>
            <p className="hero-subtitle">
              Bringing together volunteers and organizations to create positive change in communities.
            </p>
            <div className="hero-buttons">
              <Link to="/signup">
                <Button variant="primary" size="large">Get Started</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="large">Learn More</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="section section-intro">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-description">
                VolunteerConnect is dedicated to bridging the gap between skilled volunteers and organizations in need.
                Our platform makes it easy to connect, collaborate, and create meaningful impact through our innovative
                chatbot and matching system.
              </p>
            </div>

            <div className="intro-cards">
              <Card variant="elevated" className="intro-card intro-card-volunteer">
                <Card.Content>
                  <h3 className="intro-card-title">For Volunteers</h3>
                  <p className="intro-card-text">
                    Share your skills, time, and passion with organizations that need your help. Make a meaningful
                    impact in your community and beyond.
                  </p>
                  <div className="intro-card-buttons">
                    <Link to="/signup">
                      <Button variant="primary">Sign Up</Button>
                    </Link>
                    <Link to="/signin">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                  </div>
                </Card.Content>
              </Card>

              <Card variant="elevated" className="intro-card intro-card-organization">
                <Card.Content>
                  <h3 className="intro-card-title">For Organizations</h3>
                  <p className="intro-card-text">
                    Find skilled volunteers who are passionate about your cause. Our platform helps you connect with the
                    right people to support your mission.
                  </p>
                  <div className="intro-card-buttons">
                    <Link to="/signup">
                      <Button variant="success">Sign Up</Button>
                    </Link>
                    <Link to="/signin">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section section-how-it-works">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">How It Works</h2>
              <p className="section-description">
                Our platform makes volunteering and finding volunteers simple and effective.
              </p>
            </div>

            <div className="steps-container">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Sign Up</h3>
                <p className="step-description">
                  Create an account as a volunteer or an organization and complete your profile.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Connect</h3>
                <p className="step-description">
                  Use our chatbot to find the perfect match based on skills, interests, and needs.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Collaborate</h3>
                <p className="step-description">
                  Work together to make a positive impact in communities around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section section-testimonials">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Success Stories</h2>
              <p className="section-description">
                Hear from volunteers and organizations who have made a difference through our platform.
              </p>
            </div>

            <div className="testimonials-container">
              <Card variant="bordered" className="testimonial-card">
                <Card.Content>
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">S</div>
                    <div className="testimonial-info">
                      <h4 className="testimonial-name">Sarah Johnson</h4>
                      <p className="testimonial-role">Volunteer, Web Developer</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    "VolunteerConnect helped me find a nonprofit that needed my web development skills. I was able to
                    help them build a new website that increased their online donations by 30%. It was a rewarding
                    experience that made a real difference."
                  </p>
                </Card.Content>
              </Card>

              <Card variant="bordered" className="testimonial-card">
                <Card.Content>
                  <div className="testimonial-header">
                    <div className="testimonial-avatar testimonial-avatar-org">C</div>
                    <div className="testimonial-info">
                      <h4 className="testimonial-name">Community Food Bank</h4>
                      <p className="testimonial-role">Nonprofit Organization</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    "Finding volunteers with specific skills was always a challenge for us. With VolunteerConnect, we
                    were able to quickly find volunteers who could help with our food distribution program. The platform
                    made the entire process seamless."
                  </p>
                </Card.Content>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section section-cta">
          <div className="container">
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Join our community of volunteers and organizations today and start making an impact.
            </p>
            <div className="cta-buttons">
              <Link to="/signup">
                <Button variant="primary" size="large">Sign Up Now</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="large">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
