import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
//dev-urxvj6o2.us.auth0.com
//Z0l7aBMK5as4ic6pHp70HS8ZyicfWotF
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-96hn-g7i.jp.auth0.com"
      clientId="pYHEUXn0RQVKNtfLxELKX5Cn5o7yxuCY"
      redirectUri={window.location.origin}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
