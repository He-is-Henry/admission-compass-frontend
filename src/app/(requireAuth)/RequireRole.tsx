"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

type Role = "admin" | "editor";

export default function RequireRole({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: Role[];
}) {
  const { user } = useAuth();
  const router = useRouter();

  const allowed =
    user?.role === "admin" ||
    (roles ? roles.includes(user?.role as Role) : false);

  useEffect(() => {
    if (user && !allowed) router.push("/dashboard");
  }, [user]);

  if (!user || !allowed) return null;
  return <>{children}</>;
}
