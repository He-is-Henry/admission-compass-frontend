"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard/dashboard.module.css";
import ConfirmModal from "../components/modals/ConfirmModal";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { logout, user } = useAuth();
  const navItems = [
    { icon: "🏠", label: "Dashboard", path: "/dashboard" },
    { icon: "✨", label: "New Prediction", path: "/dashboard/predict" },
    // { icon: "📜", label: "My Predictions", path: "/dashboard/predictions" },
    { icon: "💰", label: "Token Wallet", path: "/dashboard/pay" },
    { icon: "📚", label: "Past Questions", path: "/dashboard/past-questions" },
    // {
    //   icon: "💡",
    //   label: "Recommendations",
    //   path: "/dashboard/recommendations",
    // },
    { icon: "👤", label: "Profile", path: "/dashboard/profile" },
    { icon: "❓", label: "Support", path: "/support" },
    { icon: "💬", label: "Messages", path: "/dashboard/messages", admin: true },
    { icon: "🔒", label: "Admins", path: "/dashboard/admins", admin: true },
    { icon: "📝", label: "Blog", path: "/dashboard/blog", editor: true },
    { icon: "🈹", label: "Discount", path: "/dashboard/discount", admin: true },
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
      {showModal && (
        <ConfirmModal
          title="Logout?"
          description="You'll have to log back onto this device to access your account again"
          confirmLabel="Logout"
          cancelLabel="Back"
          onConfirm={logout}
          onCancel={() => setShowModal(false)}
        />
      )}
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
            <Link href="/dashboard/profile/">
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
            <nav className={styles.navScroll}>
              {navItems
                .filter((item) => {
                  if (item.admin) return user?.role === "admin";
                  if (item.editor)
                    return user?.role === "admin" || user?.role === "editor";
                  return true;
                })
                .map((item, i) => (
                  <Link
                    key={item.path + i}
                    href={item.path}
                    className={styles.navItem}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                ))}
            </nav>
            <button
              className={styles.logoutButton}
              onClick={() => setShowModal(true)}
            >
              Logout
            </button>
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
              <nav className={styles.mobileNavScroll}>
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
              </nav>
              <button
                className={styles.logoutButton}
                onClick={() => setShowModal(true)}
              >
                Logout
              </button>
            </aside>
          </div>
        )}

        <main
          className={`${styles.mainContent} ${
            !isMobile ? styles.withSidebar : ""
          }`}
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
  }, [user, loading, router]);

  if (loading) return <Loading />;
  if (!user) return null;
  return <DashboardLayout>{children}</DashboardLayout>;
}
