"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard/dashboard.module.css";
import toast from "react-hot-toast";
import ConfirmModal from "../components/modals/ConfirmModal";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { logout, user } = useAuth();
  const router = useRouter();

  const navItems = [
    { icon: "🏠", label: "Dashboard", path: "/dashboard" },
    { icon: "✨", label: "New Prediction", path: "/predict" },
    // { icon: "📜", label: "My Predictions", path: "/dashboard/predictions" },
    { icon: "💰", label: "Token Wallet", path: "/pay" },
    { icon: "📚", label: "Past Questions", path: "/past-questions" },
    // {
    //   icon: "💡",
    //   label: "Recommendations",
    //   path: "/dashboard/recommendations",
    // },
    { icon: "👤", label: "Profile", path: "/profile" },
    { icon: "❓", label: "Support", path: "/support" },
    { icon: "💬", label: "Messages", path: "/messages", admin: true },
    { icon: "🔒", label: "Admins", path: "/admins", admin: true },
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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };
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
            <Link href="/profile/">
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
              {navItems
                .filter((item) => !item.admin || user?.role === "admin")
                .map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={styles.navItem}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                ))}
              <button
                className={styles.logoutButton}
                onClick={() => setShowModal(true)}
              >
                Logout
              </button>
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
                <button
                  className={styles.logoutButton}
                  onClick={() => setShowModal(true)}
                >
                  Logout
                </button>
              </nav>
            </aside>
          </div>
        )}

        <main
          className={styles.mainContent}
          style={!isMobile ? { marginLeft: "256px" } : {}}
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
