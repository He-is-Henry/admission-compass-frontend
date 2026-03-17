"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
