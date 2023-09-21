import Player from "@/components/Player";
import Header from "@/components/Header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SignInButton } from "@/components/SignInButton";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex h-screen	justify-center items-center">
        <div className="flex flex-col justify-center items-center h-[500px] bg-slate-700 w-[300px] p-5 rounded-md shadow-2xl">
          <div className="mb-5">Mi_Tinder</div>
          <SignInButton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Player session={session} />
    </div>
  );
}
