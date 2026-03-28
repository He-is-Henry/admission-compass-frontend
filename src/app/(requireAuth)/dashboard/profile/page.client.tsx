"use client";

import { useRef, useState } from "react";
import styles from "./profile.module.css";
import { useAuth } from "@/app/hooks/useAuth";
import toast from "react-hot-toast";
import SessionsPanel from "./SessionsPanel";
import api from "@/app/api/axios";
import { AxiosError } from "axios";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import AddPaswordPage from "../../add-password/page.client";

export default function ProfilePage() {
  const { user, logout, deleteAccount, setUser } = useAuth();

  // ── Edit email ───────────────────────────────
  const [email, setEmail] = useState(user?.email ?? "");
  const [emailLoading, setEmailLoading] = useState(false);

  // ── Edit password ────────────────────────────
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState("");

  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUnlinkConfirm, setShowUnlinkConfirm] = useState(false);

  const [username, setUsername] = useState(user?.username ?? "");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [unlinkLoading, setUnlinkLoading] = useState(false);

  // ── Danger zone ──────────────────────────────
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const hasEmail = user?.providers.includes("email");
  const hasGoogle = user?.providers.includes("google");
  const handleUsernameSave = async () => {
    if (!username || username === user?.username) return;
    setUsernameLoading(true);
    try {
      await api.patch("/", { username });
      setUser((prev: User | null) => (prev ? { ...prev, username } : null));
      toast.success("Username updated");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error ?? "Failed to update username");
    } finally {
      setUsernameLoading(false);
    }
  };
  const handleEmailSave = async () => {
    if (!email || email === user?.email) return;
    setEmailLoading(true);
    try {
      await api.patch("/", { email });
      setUser((prev: User | null) => (prev ? { ...prev, email } : null));
      toast.success("Email updated");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error ?? "Failed to update email");
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordSave = async () => {
    setPwError("");
    if (!currentPw || !newPw || !confirmPw)
      return setPwError("All fields are required.");
    if (newPw !== confirmPw) return setPwError("Passwords do not match.");
    if (newPw.length < 8)
      return setPwError("Password must be at least 8 characters.");

    setPwLoading(true);
    try {
      await api.patch("/", {
        currentPassword: currentPw,
        newPassword: newPw,
      });
      toast.success("Password updated");
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setPwError(error?.response?.data?.error ?? "Failed to update password");
    } finally {
      setPwLoading(false);
    }
  };

  const handleUnlinkGoogle = async () => {
    setUnlinkLoading(true);
    try {
      await api.patch("/unlink");
      setUser((prev: User | null) =>
        prev
          ? {
              ...prev,
              googleId: null,
              googleEmail: null,
              providers: prev.providers.filter((p: string) => p !== "google"),
            }
          : null,
      );
      toast.success("Google account unlinked");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error ?? "Failed to unlink Google");
    } finally {
      setUnlinkLoading(false);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleDeleteConfirm = async () => {
    if (confirmText !== user?.username) return;
    try {
      await deleteAccount();
      toast.success("Account deleted");
    } catch {
      toast.error("Failed to delete account");
    }
  };

  if (!user) return null;

  const initials = `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`;

  return (
    <div className={styles.page}>
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
      {/* Header */}
      <div>
        <h1 className={styles.heading}>Profile</h1>
        <p className={styles.subheading}>Manage your account information</p>
      </div>

      {/* Identity Card */}
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.avatarRow}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.avatarInfo}>
              <p className={styles.avatarName}>
                {user.firstName} {user.lastName}
              </p>
              <p className={styles.avatarUsername}>@{user.username}</p>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{user.email}</span>
            </div>
            {hasGoogle && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Google Account</span>
                <span className={styles.infoValue}>{user.googleEmail}</span>
              </div>
            )}
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Tokens</span>
              <span className={styles.tokenBadge}>🪙 {user.tokens}</span>
            </div>
          </div>
        </div>
      </div>

      {hasGoogle && hasEmail && (
        <>
          {showUnlinkConfirm && (
            <ConfirmModal
              title="Unlink Google?"
              description="You'll no longer be able to sign in with Google. You can always re-link it later."
              confirmLabel="Unlink"
              cancelLabel="Cancel"
              onConfirm={async () => {
                setShowUnlinkConfirm(false);
                await handleUnlinkGoogle();
              }}
              onCancel={() => setShowUnlinkConfirm(false)}
            />
          )}

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Connected Accounts</h2>
              <p className={styles.cardDesc}>
                Manage your linked sign-in methods
              </p>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Google</span>
                <span className={styles.infoValue}>{user.googleEmail}</span>
              </div>
              <p className={styles.cardDesc}>
                Unlinking means you can only sign in with your password.
              </p>
              <button
                className={styles.btnOutline}
                onClick={() => setShowUnlinkConfirm(true)}
                disabled={unlinkLoading}
                style={{ alignSelf: "flex-start" }}
              >
                {unlinkLoading ? "Unlinking…" : "Unlink Google account"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* O'Level Results */}
      {user.oLevel?.length > 0 && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>O'Level Results</h2>
            <p className={styles.cardDesc}>Your registered subject grades</p>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.oLevelList}>
              {user.oLevel.map(
                (item: { subject: string; grade: string }, i: number) => (
                  <div key={i} className={styles.oLevelRow}>
                    <span className={styles.oLevelSubject}>{item.subject}</span>
                    <span className={styles.oLevelGrade}>{item.grade}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Username */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Update Username</h2>
          <p className={styles.cardDesc}>Change your public username</p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Username</label>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            className={styles.btnPrimary}
            onClick={handleUsernameSave}
            disabled={usernameLoading || username === user.username}
            style={{ alignSelf: "flex-start" }}
          >
            {usernameLoading ? "Saving…" : "Save Username"}
          </button>
        </div>
      </div>
      {/* Edit Email */}
      {hasEmail && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Update Email</h2>
            <p className={styles.cardDesc}>Change your login email address</p>
            {hasGoogle && (
              <p className={styles.cardDesc}>
                ⚠️ This only changes your email/password login. Your Google
                login is unaffected and still uses your Google account.
                <span
                  className={styles.infoIcon}
                  title="Changing this email does not affect Google login. To login with Google later, use your original Google account."
                >
                  ℹ️
                </span>
              </p>
            )}
          </div>
          <div className={styles.cardBody}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className={styles.btnPrimary}
              onClick={handleEmailSave}
              disabled={emailLoading || email === user.email}
              style={{ alignSelf: "flex-start" }}
            >
              {emailLoading ? "Saving…" : "Save Email"}
            </button>
          </div>
        </div>
      )}
      {/* Change Password */}
      {hasEmail ? (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Change Password</h2>
            <p className={styles.cardDesc}>Keep your account secure</p>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                type={showCurrentPw ? "text" : "password"}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowCurrentPw((v) => !v)}
              >
                {showCurrentPw ? "Hide" : "Show"}
              </button>
            </div>
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                type={showNewPw ? "text" : "password"}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowNewPw((v) => !v)}
              >
                {showNewPw ? "Hide" : "Show"}
              </button>
            </div>

            <div className={styles.inputWrap}>
              <label className={styles.fieldLabel}>Confirm New Password</label>
              <input
                className={`${styles.input} ${pwError && newPw !== confirmPw ? styles.inputError : ""}`}
                type={showConfirmPw ? "text" : "password"}
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirmPw((v) => !v)}
              >
                {showConfirmPw ? "Hide" : "Show"}
              </button>
            </div>
            {pwError && <p className={styles.errorText}>{pwError}</p>}
            <button
              className={styles.btnPrimary}
              onClick={handlePasswordSave}
              disabled={pwLoading}
              style={{ alignSelf: "flex-start" }}
            >
              {pwLoading ? "Updating…" : "Update Password"}
            </button>
          </div>
        </div>
      ) : (
        <AddPaswordPage />
      )}

      {/* Sessions */}
      <SessionsPanel
        sessions={user?.sessions ?? []}
        onRevoke={(updated) => {
          setUser((prev: User | null) =>
            prev ? { ...prev, sessions: updated } : null,
          );
        }}
      />

      {/* Logout */}
      <button className={styles.logoutBtn} onClick={() => setShowModal(true)}>
        Logout
      </button>

      {/* Danger Zone */}
      <div className={styles.dangerCard}>
        <div className={styles.dangerHeader}>
          <h2 className={styles.dangerTitle}>Danger Zone</h2>
          <p className={styles.dangerDesc}>This action is irreversible.</p>
        </div>
        <div className={styles.dangerBody}>
          {!showConfirmDelete ? (
            <button
              className={styles.dangerBtn}
              onClick={() => setShowConfirmDelete(true)}
              style={{ alignSelf: "flex-start" }}
            >
              Delete Account
            </button>
          ) : (
            <div className={styles.confirmDeleteWrap}>
              <p className={styles.confirmDeleteNote}>
                Type <strong>{user.username}</strong> to confirm deletion:
              </p>
              <input
                className={styles.input}
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Username"
              />
              <div className={styles.confirmDeleteActions}>
                <button
                  className={styles.dangerBtn}
                  disabled={confirmText !== user.username}
                  onClick={handleDeleteConfirm}
                >
                  Confirm Delete
                </button>
                <button
                  className={styles.btnOutline}
                  onClick={() => {
                    setShowConfirmDelete(false);
                    setConfirmText("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
