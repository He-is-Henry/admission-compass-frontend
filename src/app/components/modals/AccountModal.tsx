"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./modal.module.css";
import { useAuth } from "@/app/hooks/useAuth";
import toast from "react-hot-toast";
import SessionsPanel from "./SessionsPanel";

type Props = {
  closeModal: () => void;
};

export default function AccountModal({ closeModal }: Props) {
  const { user, logout, deleteAccount, setUser } = useAuth();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleLogoutClick = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      closeModal();
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleDeleteConfirm = async () => {
    if (confirmText !== user?.username) return;
    try {
      await deleteAccount(); // calls context
      toast.success("Account deleted successfully");
      closeModal();
    } catch {
      toast.error("Failed to delete account");
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [closeModal]);

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}>
          ✕
        </button>
        {/* Header */}
        <div className={styles.header}>
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
          <p>@{user?.username}</p>
        </div>
        {/* Info */}
        <div className={styles.section}>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Tokens:</strong> {user?.tokens}
          </p>
        </div>
        {/* O’Level */}
        {user && user?.oLevel?.length > 0 && (
          <div className={styles.section}>
            <h4>O’Level Results</h4>
            <ul className={styles.list}>
              {user.oLevel.map((item, i) => (
                <li key={i}>
                  {item.subject} — {item.grade}
                </li>
              ))}
            </ul>
          </div>
        )}
        <SessionsPanel
          sessions={user?.sessions ?? []}
          onRevoke={(updated) => {
            setUser((prev: User | null) =>
              prev ? { ...prev, sessions: updated } : null,
            );
          }}
        />
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
        {/* Danger Zone */}
        <div className={styles.dangerZone}>
          <h4>Danger Zone</h4>
          <p>This action cannot be undone.</p>

          {!showConfirmDelete ? (
            <button
              className={styles.dangerBtn}
              onClick={() => setShowConfirmDelete(true)}
            >
              Delete Account
            </button>
          ) : (
            <div className={styles.confirmDelete}>
              <p>Type your username to confirm:</p>
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Username"
              />
              <button
                className={styles.dangerBtn}
                disabled={confirmText !== user?.username}
                onClick={handleDeleteConfirm}
              >
                Confirm Delete
              </button>
              <button
                className={styles.secondaryBtn}
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
