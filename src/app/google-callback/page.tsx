"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { tokenStore } from "../lib/tokenStore";
import { useAuth } from "../hooks/useAuth";

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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/google-callback`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ code }),
          },
        );

        const data = await res.json();

        if (!res.ok) return router.push("/?modal=login&error=google_failed");

        // Merge prompt — don't redirect, show UI
        if (data.merge) {
          setMergeToken(data.mergeToken);
          setMergePrompt(true);
          return;
        }

        tokenStore.set(data.accessToken);
        await refreshUser();

        // Check if user wanted to add a password
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
  }, []);

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
      <div>
        <h2>Account already exists</h2>
        <p>
          An account with this email already exists. Would you like to link your
          Google account to it? You will be able to sign in with either.
        </p>
        <button onClick={handleMerge} disabled={loading}>
          {loading ? "Linking..." : "Link my Google account"}
        </button>
        <button onClick={() => router.push("/?modal=login")} disabled={loading}>
          Login with password instead
        </button>
      </div>
    );
  }

  return <p>Signing you in...</p>;
}
