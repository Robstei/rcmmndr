import SessionProviderWraper from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
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
