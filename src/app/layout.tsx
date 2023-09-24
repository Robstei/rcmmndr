import SessionProviderWraper from "@/components/SessionProviderWraper";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";

export const metadata = {
  title: "Rcmmndr",
  description: "Rcmmndr",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        {session ? (
          <SessionProviderWraper session={session}>
            {children}
          </SessionProviderWraper>
        ) : (
          <div>{children}</div>
        )}
      </body>
    </html>
  );
}
