import { Metadata } from "next";
import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";

type Props = {
  searchParams: { token: string };
};

type VerifyResult =
  | { type: "OK"; firstName: string }
  | { type: "RATE_LIMITED"; resetTime: number }
  | { type: "INVALID" };

const getUserFirstName = async (token: string): Promise<VerifyResult> => {
  const baseURL = "https://admission-compass-backend.onrender.com";
  try {
    const res = await fetch(`${baseURL}/verify?token=${token}`);
    if (res.status === 429) {
      const resetHeader = res.headers.get("ratelimit-reset");
      const resetTime = resetHeader
        ? Date.now() + parseInt(resetHeader) * 1000
        : Date.now() + 60 * 1000;
      return { type: "RATE_LIMITED", resetTime };
    }
    if (!res.ok) return { type: "INVALID" };
    const data: { firstName: string } = await res.json();
    return { type: "OK", firstName: data.firstName };
  } catch {
    return { type: "INVALID" };
  }
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { token } = await searchParams;
  const result = await getUserFirstName(token);
  return {
    title:
      result.type === "OK"
        ? `${result.firstName} - Reset Password`
        : "Reset Password",
  };
}

async function page({ searchParams }: Props) {
  const { token } = await searchParams;
  const result = await getUserFirstName(token);

  return <ResetPasswordForm result={result} token={token} />;
}

export default page;
