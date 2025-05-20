import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">VolunteerConnect</h3>
            <p className="footer-description">
              Connecting volunteers with organizations to make a difference in communities around the world.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="icon-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="icon-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="icon-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="icon-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Contact Us</h3>
            <address className="footer-address">
              <p>123 Volunteer Street</p>
              <p>Community City, CO 12345</p>
              <p className="mt-2">Email: info@volunteerconnect.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Newsletter</h3>
            <p className="footer-description">
              Subscribe to our newsletter to receive updates on new volunteer opportunities.
            </p>
            <form className="footer-form">
              <input type="email" placeholder="Your email address" className="footer-input" />
              <button type="submit" className="footer-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {currentYear} VolunteerConnect. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms" className="footer-bottom-link">
              Terms of Service
            </Link>
            <Link to="/privacy" className="footer-bottom-link">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="footer-bottom-link">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
