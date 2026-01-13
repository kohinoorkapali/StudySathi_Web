import React from "react";
import "../../css/LandingPage.css";
import logo from "../../assets/studysathi_2.png";
import arrow from "../../assets/arrow.png";
import Books from "../../assets/Books.png"; // import background image
import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${Books})`,   // background set via JSX
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay layer */}
      <div className="overlay"></div>

              <header className="landing-header">
        <img src={logo} alt="StudySathi Logo" className="logo" />
        <Link to="/login" className="sign-in">
          Sign In
        </Link>
      </header>

      <main className="intro">
        <h1>Your Perfect Study Companion</h1>
        <p>
          StudySathi empowers students to learn smarter, collaborate better, and
          achieve their academic goals with powerful tools and resources.
        </p>
        <Link to="/register" className="get-started">
          Get Started
          <img src={arrow} alt="arrow icon" className="arrow-icon" />
        </Link>
      </main>


      {/* Features */}
      <section className="features">
        <div className="feature-box">
          <h3>Smart Resources</h3>
          <p>
            Access a comprehensive collection of study materials contributed by
            students across different courses.
          </p>
        </div>
        <div className="feature-box">
          <h3>Upload & Share Notes</h3>
          <p>
            Easily upload your own notes and study materials to help your peers
            in the same stream.
          </p>
        </div>
        <div className="feature-box">
          <h3>Stream-Based Browsing</h3>
          <p>
            Quickly browse and find notes that are organized according to your
            academic stream.
          </p>
        </div>
      </section>
    </div>
  );
}