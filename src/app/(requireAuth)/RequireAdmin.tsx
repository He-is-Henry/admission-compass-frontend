"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") router.push("/dashboard");
  }, [user]);

  if (!user || user.role !== "admin") return null;
  return <>{children}</>;
}
