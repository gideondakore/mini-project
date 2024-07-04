import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        <span className="copyright">
          &copy; {new Date().getFullYear()} Duplex. All rights reserved.
        </span>
        <nav className="footer-nav">
          <ul className="footer-ul">
            <li>
              <Link
                to="https://github.com/gideondakore"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i> GitHub
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/in/gideon-dakore/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
