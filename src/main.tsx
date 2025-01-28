import { scan } from "react-scan";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  scan({
    enabled: true,
    // log: true, // logs render info to console (default: false)
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
