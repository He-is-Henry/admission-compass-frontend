"use client";

import { useState } from "react";
import styles from "./SessionsPanel.module.css";
import revokeSessions from "@/app/lib/revokeSessions";

type Props = {
  sessions: Session[];
  onRevoke: (updatedSessions: Session[]) => void;
};

function DeviceIcon({ platform }: { platform: "mobile" | "desktop" }) {
  if (platform === "mobile") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    );
  }
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function SessionsPanel({ sessions, onRevoke }: Props) {
  const [revoking, setRevoking] = useState<string | null>(null);
  const [revokingAll, setRevokingAll] = useState(false);

  const handleRevoke = async (id: string) => {
    setRevoking(id);
    try {
      const updated = await revokeSessions([id]);
      onRevoke(updated);
    } finally {
      setRevoking(null);
    }
  };

  const handleRevokeAll = async () => {
    setRevokingAll(true);
    try {
      const otherIds = sessions.filter((s) => !s.current).map((s) => s._id);
      const updated = await revokeSessions(otherIds);
      onRevoke(updated);
    } finally {
      setRevokingAll(false);
    }
  };

  console.log(sessions);
  const otherSessions = sessions ? sessions.filter((s) => !s.current) : [];

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h4 className={styles.panelTitle}>Active Sessions</h4>
        {otherSessions.length > 1 && (
          <button
            className={styles.revokeAllBtn}
            onClick={handleRevokeAll}
            disabled={revokingAll}
          >
            {revokingAll ? "Revoking..." : "Revoke all others"}
          </button>
        )}
      </div>

      <ul className={styles.list}>
        {sessions.map((session) => (
          <li
            key={session._id}
            className={`${styles.item} ${session.current ? styles.current : ""}`}
          >
            <div className={styles.iconCol}>
              <span className={styles.deviceIcon}>
                <DeviceIcon platform={session.platform} />
              </span>
            </div>

            <div className={styles.info}>
              <div className={styles.topRow}>
                <span className={styles.device}>{session.device}</span>
                {session.current && (
                  <span className={styles.badge}>This device</span>
                )}
              </div>
              <div className={styles.meta}>
                <span>{session.location}</span>
                <span className={styles.dot}>·</span>
                <span>Active {timeAgo(session.lastUsed)}</span>
              </div>
            </div>

            {!session.current && (
              <button
                className={styles.revokeBtn}
                onClick={() => handleRevoke(session._id)}
                disabled={revoking === session._id}
              >
                {revoking === session._id ? "..." : "Revoke"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
