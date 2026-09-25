import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { LanguageProvider } from "./i18n";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);
