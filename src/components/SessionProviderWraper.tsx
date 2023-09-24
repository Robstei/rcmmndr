"use client";

import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { ReactNode } from "react";

export default function SessionProviderWraper({
  session,
  children,
}: {
  session: Session;
  children: ReactNode;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
