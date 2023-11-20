"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./button";
import Link from "next/link";
export const LogoutButton = () => {
  const { data: session } = useSession();
  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <>
      {session ? (
        <Button onClick={handleClick}> Sign out</Button>
      ) : (
        <Link
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/login"
        >
          Login
        </Link>
      )}
    </>
  );
};
