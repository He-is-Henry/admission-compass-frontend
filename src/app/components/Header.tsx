"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Refs to detect outside clicks
  const loginRef = useRef<HTMLDivElement | null>(null);
  const signupRef = useRef<HTMLDivElement | null>(null);

  const closeAllModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      const target = e.target as Node;
      // Close if click outside both modals
      if (showLogin && loginRef.current && !loginRef.current.contains(target)) {
        closeAllModals();
        console.log("closed login");
      }

      if (
        showSignup &&
        signupRef.current &&
        !signupRef.current.contains(target)
      ) {
        console.log("closed signup");

        closeAllModals();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllModals();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLogin, showSignup]);

  const openLogin = () => {
    if (!showLogin) {
      closeAllModals();
      setShowLogin(true);
    }
  };

  const openSignup = () => {
    if (!showSignup) {
      closeAllModals();
      setShowSignup(true);
    }
  };

  return (
    <header className={styles.header}>
      <div>
        {showLogin && (
          <div
            ref={loginRef}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <LoginModal closeModal={() => setShowLogin(false)} />
          </div>
        )}
        {showSignup && (
          <div
            ref={signupRef}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <SignupModal closeModal={() => setShowSignup(false)} />
          </div>
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Logo */}
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

          {/* Nav */}
          <nav className={styles.nav} aria-label="Main navigation">
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
            <button onClick={openLogin} className={styles.loginButton}>
              Login
            </button>
            <button onClick={openSignup} className={styles.signupButton}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
