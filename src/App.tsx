import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SigninPage from "./Pages/SigninPage";
import { AuthProvider } from "./Contexts/AuthContexts";
import ProtectedRouter from "./Components/ProtectedRouter";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
