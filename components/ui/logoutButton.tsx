"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./button";
export const LogoutButton = () => {
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  return <Button onClick={() => signOut()}>Logout</Button>;
};
