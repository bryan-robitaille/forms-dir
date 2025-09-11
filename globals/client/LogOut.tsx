"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export const LogOut = ({ language = "en" }) => {
  const { data, status } = useSession();

  if (status === "loading") {
    return;
  }

  if (status === "unauthenticated") {
    return <div></div>;
  }
  return (
    <form
      action={async () => {
        signOut({ redirectTo: `/${language}`, redirect: true });
      }}
    >
      <button
        className="border-gcds-blue-800 bg-gcds-blue-900 text-white-default hover:border-gcds-blue-800 hover:bg-gcds-blue-800 hover:text-white-default active:border-black"
        type="submit"
      >
        Sign Out
      </button>
    </form>
  );
};
