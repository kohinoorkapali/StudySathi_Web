import React from "react";
import "./LandingPage.css";
import logo from "../../assets/studysathi_2.png"; 
import arrow from "../../assets/arrow.png";

export default function LandingPage() {
  return (
    <div className="landing-page">
        
      {/* Overlay layer */}
      <div className="overlay"></div>


      <header className="header">
        <img src={logo} alt="StudySathi Logo" className="logo" />
        <button className="sign-in">Sign In</button>
      </header>

      <main className="intro">
        <h1>Your Perfect Study Companion</h1>
        <p>
          StudySathi empowers students to learn smarter, collaborate better, and achieve their academic goals with powerful tools and resources.
        </p>
        <button className="get-started">
          Get Started
          <img src={arrow} alt="arrow icon" className="arrow-icon" />
        </button>

      </main>

      <section className="features">
        <div className="feature-box">
          <h3>Smart Resources</h3>
          <p>
            Access a comprehensive collection of study materials contributed by students across different courses.
          </p>
        </div>
        <div className="feature-box">
          <h3>Upload & Share Notes</h3>
          <p>
            Easily upload your own notes and study materials to help your peers in the same stream.
          </p>
        </div>
        <div className="feature-box">
          <h3>Stream-Based Browsing</h3>
          <p>
            Quickly browse and find notes that are organized according to your academic stream.
          </p>
        </div>
      </section>
    </div>
  );
}