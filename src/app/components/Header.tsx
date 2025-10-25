"use client";
import React, { useState } from "react";
import styles from "./header.module.css";
import { showLogin, showSignup } from "@/lib/modals";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const closeAllModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const openLogin = () => {
    if (showLogin) return;
    closeAllModals();
    setShowLogin(true);
  };
  const openSignup = () => {
    if (showSignup) return;
    closeAllModals();
    setShowSignup(true);
  };
  return (
    <header className={styles.header}>
      <div>
        {showLogin && <LoginModal />}
        {showSignup && <SignupModal />}
      </div>
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Logo section */}
          <div className={styles.logoWrapper}>
            <div className={styles.logoCircle}>
              <svg
                className={styles.logoIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-label="Admission Compass logo"
              >
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <span className={styles.brandName}>Admission Compass</span>
          </div>

          {/* Navigation */}
          <nav
            className={styles.nav}
            role="navigation"
            aria-label="Main navigation"
          >
            <a href="#features" className={styles.navLink}>
              Features
            </a>
            <a href="#pricing" className={styles.navLink}>
              Pricing
            </a>
            <a href="#about" className={styles.navLink}>
              About
            </a>
            <a href="#contact" className={styles.navLink}>
              Contact
            </a>
          </nav>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button
              onClick={openLogin}
              className={styles.loginButton}
              aria-label="Login to your account"
            >
              Login
            </button>
            <button
              onClick={openSignup}
              className={styles.signupButton}
              aria-label="Create new account"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
