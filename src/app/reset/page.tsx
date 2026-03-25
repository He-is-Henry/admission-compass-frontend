import { Metadata } from "next";
import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";

type Props = {
  searchParams: { token: string };
};

const getUserFirstName = async (token: string) => {
  const baseURL = "https://admission-compass-backend.onrender.com";
  try {
    const res = await fetch(`${baseURL}/verify?token=${token}`);
    if (!res.ok) return null;
    const text = await res.text();
    if (!text) return null;
    const data: { firstName: string } = JSON.parse(text);
    return data.firstName;
  } catch {
    return null;
  }
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { token } = await searchParams;
  const firstName = await getUserFirstName(token);
  return {
    title: firstName ? `${firstName} - Reset Password` : "Reset Password",
  };
}

async function page({ searchParams }: Props) {
  const { token } = await searchParams;
  const firstName = await getUserFirstName(token);

  return <ResetPasswordForm firstName={firstName} token={token} />;
}

export default page;
