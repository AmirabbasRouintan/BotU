import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { AnimationProvider } from "./contexts/AnimationContext";
import { LanguageProvider } from "./contexts/LanguageContext";

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AnimationProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </AnimationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);