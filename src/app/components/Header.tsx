"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import AccountModal from "./modals/AccountModal";

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  // Refs to detect outside clicks
  const loginRef = useRef<HTMLDivElement | null>(null);
  const signupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref) setShowSignup(true);
  }, [ref]);
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
  console.log(user);

  return (
    <header className={styles.header}>
      <div>
        {showLogin && (
          <div
            ref={loginRef}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <LoginModal
              showSignup={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
              closeModal={() => setShowLogin(false)}
            />
          </div>
        )}
        {showSignup && (
          <div
            ref={signupRef}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <SignupModal
              showLogin={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
              closeModal={() => setShowSignup(false)}
            />
          </div>
        )}

        {showAccount && (
          <AccountModal closeModal={() => setShowAccount(false)} />
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Logo */}
          <div className={styles.logoWrapper} onClick={() => router.push("/")}>
            <Image
              src="/admissioncompass.jpg"
              alt="Admission Compass Logo"
              width={40}
              height={40}
              className={styles.logoImage}
            />
            {/*             <span className={styles.brandName}>ADMISSION COMPASS</span>
             */}{" "}
          </div>

          {/* Nav */}
          {isHome && (
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
          )}

          {/* Buttons */}
          {user ? (
            <div
              className={styles.userPill}
              onClick={() => setShowAccount(true)}
            >
              <div className={styles.avatar}>
                {user.username.charAt(0).toUpperCase()}
              </div>

              <span className={styles.username}>{user.username}</span>
            </div>
          ) : loading ? (
            "Loading..."
          ) : (
            <div className={styles.buttonGroup}>
              <button onClick={openLogin} className={styles.loginButton}>
                Login
              </button>
              <button onClick={openSignup} className={styles.signupButton}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
