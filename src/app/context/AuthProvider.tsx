"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import getCurrentUser from "../lib/getCurrentUser";
import handleLogout from "../lib/logout";
import handleDeleteAccount from "../lib/deleteAccount";
import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  //  fetch user
  const refreshUser = async () => {
    try {
      const data = await getCurrentUser();
      console.log("User data available");
      setUser(data);
    } catch {
      setUser(null); // not logged in
    } finally {
      setLoading(false);
    }
  };

  //  initial load
  useEffect(() => {
    refreshUser();
  }, []);

  //  logout
  const logout = async () => {
    await handleLogout();
    setUser(null); // instant UI update
    router.refresh(); // sync server
  };

  // delete account
  const deleteAccount = async () => {
    await handleDeleteAccount();
    setUser(null);
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        refreshUser,
        logout,
        deleteAccount,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
