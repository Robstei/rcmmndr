import React from 'react';
import Link from 'next/link';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <Link className="btn-spotify" href="/api/login" >
                    Login with Spotify 
                </Link>
            </header>
        </div>
    );
}

export default Login;