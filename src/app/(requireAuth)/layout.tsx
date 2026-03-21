"use client";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Loading from "../loading";
import { useRouter } from "next/navigation";

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
  return <main>{children}</main>;
}
