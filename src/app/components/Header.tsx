"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";

//added dashboard functionality
function getInitials(name?: string | null): string {
  if (!name) return "?";
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

const Header: React.FC = () => {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const modal = searchParams.get("modal");
  console.log(modal);

  const [showLogin, setShowLogin] = useState(modal === "login");
  const [showSignup, setShowSignup] = useState(modal === "signup");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDashboard = pathname.includes("/dashboard");
  useEffect(() => {
    if (modal === "login") {
      setShowLogin(true);
      setShowSignup(false);
    } else if (modal === "signup") {
      setShowSignup(true);
      setShowLogin(false);
    }
  }, [modal]);
  // Refs to detect outside clicks

  useEffect(() => {
    if (ref) setShowSignup(true);
  }, [ref]);
  const closeAllModals = () => {
    setShowLogin(false);
    setShowSignup(false);
    router.replace(pathname);
  };

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
          <LoginModal
            showSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
            closeModal={closeAllModals}
          />
        )}
        {showSignup && (
          <SignupModal
            showLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
            closeModal={closeAllModals}
          />
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Logo */}
          <div className={styles.logoWrapper} onClick={() => router.push("/")}>
            <Image
              src="/Admission.png"
              alt="Admission Compass Logo"
              width={40}
              height={40}
              className={styles.logoImage}
            />
            {<span className={styles.brandName}>ADMISSION COMPASS</span>}{" "}
          </div>
          <button
            className={`${styles.hamburger} ${drawerOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Backdrop */}
          <div
            className={`${styles.backdrop} ${drawerOpen ? styles.backdropOpen : ""}`}
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer */}
          <div
            className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}
          >
            <button
              className={styles.drawerClose}
              onClick={() => setDrawerOpen(false)}
            >
              ✕
            </button>
            <nav className={styles.drawerNav}>
              <a
                href="#features"
                className={styles.drawerLink}
                onClick={() => setDrawerOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className={styles.drawerLink}
                onClick={() => setDrawerOpen(false)}
              >
                Pricing
              </a>
              <a
                href="/about"
                className={styles.drawerLink}
                onClick={() => setDrawerOpen(false)}
              >
                About
              </a>
              <Link
                href="/support"
                className={styles.drawerLink}
                onClick={() => setDrawerOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className={styles.drawerLink}
                onClick={() => setDrawerOpen(false)}
              >
                Blog
              </Link>
            </nav>
            <div className={styles.drawerActions}>
              <button
                onClick={() => {
                  openLogin();
                  setDrawerOpen(false);
                }}
                className={styles.drawerLoginButton}
              >
                Login
              </button>
              <button
                onClick={() => {
                  openSignup();
                  setDrawerOpen(false);
                }}
                className={styles.drawerSignupButton}
              >
                Sign up
              </button>
            </div>
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
              <a href="/about" className={styles.navLink}>
                About
              </a>
              <Link href="/support" className={styles.navLink}>
                Contact
              </Link>
              <Link href="/blog" className={styles.navLink}>
                Blog
              </Link>
            </nav>
          )}

          {/* Buttons */}
          {user && isDashboard ? (
            ""
          ) : user && !isDashboard ? (
            <button
              className={styles.dashboardButton}
              onClick={() => router.push("/dashboard")}
            >
              <div className={styles.avatarCircle}>
                {getInitials(user.firstName ?? user.email)}
              </div>
              <span className={styles.userName}>
                {user.username ?? user.email}
              </span>
            </button>
          ) : loading ? (
            <p style={{ color: "white" }}>Loading...</p>
          ) : (
            <div className={styles.buttonGroup}>
              <button onClick={openLogin} className={styles.loginButton}>
                Login
              </button>
              <button onClick={openSignup} className={styles.signupButton}>
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
