import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SigninPage from "./Pages/SigninPage";
import { AuthProvider } from "./Contexts/AuthContexts";
import ProtectedRouter from "./Components/ProtectedRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/signin" element={<SigninPage />} />
            <Route
              path="/"
              element={
                <ProtectedRouter>
                  <MainPage />
                </ProtectedRouter>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
