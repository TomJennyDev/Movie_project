import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import StoreContextProvider from "./contexts/StoreContext";
import ThemeProvider from "./contexts/ThemeProvider";
import Router from "./routes";

function App() {
  return (
    <AuthProvider>
      <StoreContextProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </StoreContextProvider>
    </AuthProvider>
  );
}

export default App;
