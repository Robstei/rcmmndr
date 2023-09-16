import Login from "@/components/Login";
import WebPlayback from "@/components/WebPlayback";
import Header from "@/components/Header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  //console.log(session?.user.id);
  /*   const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    setAccessToken(getCookie("accessToken"));
  }, []);
 */
  //const [token, setToken] = useState('');

  /*   useEffect(() => {

    async function getToken() {
      const response = await fetch('/api/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []); */

  return (
    <>
      <Header />
      <h1>mi_tinder</h1>
      {session ? <WebPlayback session={session} /> : <Login />}
      <pre></pre>
    </>
  );
}
