import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  import.meta.env.GOOGLE_CLIENT_ID ||
  "200341851517-gp3c3ggv9ioi4u8tkkmi9aeds5ndbsj3.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
