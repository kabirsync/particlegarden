import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppThree from "@/AppThree";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThree />
  </StrictMode>
);
