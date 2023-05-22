import Script from "next/script";
import { useEffect, useState } from "react";
import Login from "@/components/Login";
import WebPlayback from "@/components/WebPlayback";

export default function HomePage() {

/*   useEffect(()=>{
    async function fetchData(){
      const data = await fetch("/api/login")
      console.log("data")
    }
    fetchData()
  },[])
 */
  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/api/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);


  return (
    <>
    <h1>mi_tinder</h1>
      { (token === '') ? <Login/> : <WebPlayback token={token} /> }
    </>
  );
}
