import React from "react";

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title-text">Moosic</div>
        <a className="login" href="/auth/login">
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default Login;
