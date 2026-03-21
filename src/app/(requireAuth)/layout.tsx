"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard/dashboard.module.css";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { user } = useAuth();

  // Mock nav items
  const navItems = [
    { icon: "🏠", label: "Dashboard", path: "/dashboard" },
    { icon: "✨", label: "New Prediction", path: "/dashboard/new-prediction" },
    { icon: "📜", label: "My Predictions", path: "/dashboard/predictions" },
    { icon: "💰", label: "Token Wallet", path: "/dashboard/tokens" },
    { icon: "📚", label: "Past Questions", path: "/dashboard/past-questions" },
    {
      icon: "💡",
      label: "Recommendations",
      path: "/dashboard/recommendations",
    },
    { icon: "👤", label: "Profile", path: "/dashboard/profile" },
    { icon: "❓", label: "Support", path: "/dashboard/support" },
  ];

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  const avatar = user?.username.charAt(0);

  return (
    <div className={styles.dashboardWrapper}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.logoSection}>
            {/* Only render hamburger on mobile */}
            {isMobile && (
              <button
                className={styles.mobileMenuButton}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? "❌" : "☰"}
              </button>
            )}
          </div>

          <div className={styles.topBarRight}>
            <span className={styles.tokenBalance}>{user?.tokens} Tokens</span>
            <button className={styles.notifications}>🔔</button>
            <Link href="/dashboard/">
              {" "}
              {/* Do nothing for the mean time */}
              <span className={styles.avatar}>{avatar}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        {/* Don't render permanent bar on small screens */}
        {!isMobile && (
          <aside className={styles.sidebar}>
            <nav>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={styles.navItem}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              ))}
              <button className={styles.logoutButton}>Logout</button>
            </nav>
          </aside>
        )}

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div
            className={styles.mobileSidebarBackdrop}
            onClick={() => setMobileMenuOpen(false)}
          >
            <aside
              className={styles.mobileSidebar}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.mobileSidebarHeader}>
                <span>Menu</span>
                <button onClick={() => setMobileMenuOpen(false)}>❌</button>
              </div>
              <nav>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.navItem}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                ))}
                <button className={styles.logoutButton}>Logout</button>
              </nav>
            </aside>
          </div>
        )}

        <main
          className={styles.mainContent}
          style={!isMobile ? { marginLeft: "250px" } : {}}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/?modal=login");
  }, [user, loading]);

  if (loading) return <Loading />;
  if (!user) return null;
  return <DashboardLayout>{children}</DashboardLayout>;
}
