"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { tokenStore } from "../lib/tokenStore";
import { useAuth } from "../hooks/useAuth";
import styles from "./google-callback.module.css";

type Stored = {
  timestamp: number;
  username: string;
};

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [mergePrompt, setMergePrompt] = useState(false);
  const [mergeToken, setMergeToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return router.push("/?modal=login");

    const handleCallback = async () => {
      try {
        if (typeof window == "undefined") return;
        const rawData = localStorage.getItem("ref");
        const stored: Stored = rawData ? JSON.parse(rawData) : {};
        console.log(stored);
        const ref =
          stored && Date.now() - stored.timestamp < 3600000
            ? stored.username.toLowerCase()
            : null;
        localStorage.removeItem("ref");
        console.log({ ref });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/google-callback`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ code, ref }),
          },
        );

        const data = await res.json();

        if (!res.ok) return router.push("/?modal=login&error=google_failed");

        if (data.merge) {
          setMergeToken(data.mergeToken);
          setMergePrompt(true);
          return;
        }

        tokenStore.set(data.accessToken);
        await refreshUser();

        const wantsPassword = sessionStorage.getItem("wantsPassword");
        if (wantsPassword) {
          sessionStorage.removeItem("wantsPassword");
          return router.push("/add-password");
        }

        if (data.generatedUsername) {
          return router.push("/dashboard?generatedUsername=true");
        }

        if (data.merged) {
          return router.push("/dashboard?merged=true");
        }

        router.push("/dashboard");
      } catch (err) {
        console.log(err);
        router.push("/?modal=login&error=google_failed");
      }
    };

    handleCallback();
  }, [refreshUser, router, searchParams]);

  const handleMerge = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/merge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mergeToken }),
      });

      const data = await res.json();

      if (!res.ok) return router.push("/?modal=login&error=google_failed");

      tokenStore.set(data.accessToken);
      await refreshUser();
      router.push("/dashboard?merged=true");
    } catch (err) {
      console.log(err);
      router.push("/?modal=login&error=google_failed");
    } finally {
      setLoading(false);
    }
  };

  if (mergePrompt) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Account already exists</h2>
            <p className={styles.cardDesc}>
              We found an existing account with this email address.
            </p>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.notice}>
              Would you like to <strong>link your Google account</strong> to it?
              Once linked, you can sign in with either your{" "}
              <strong>password or Google</strong> — whichever you prefer.
            </div>
            <div className={styles.actions}>
              <button
                className={styles.btnPrimary}
                onClick={handleMerge}
                disabled={loading}
              >
                {loading ? "Linking…" : "Link my Google account"}
              </button>
              <button
                className={styles.btnOutline}
                onClick={() => router.push("/?modal=login")}
                disabled={loading}
              >
                Login with password instead
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loadingPage}>
      <div className={styles.orbitRing}>
        <div className={styles.orbitDot} />
        <div className={styles.innerDot}>
          <span />
        </div>
      </div>
      <p className={styles.loadingText}>Signing you in…</p>
    </div>
  );
}
