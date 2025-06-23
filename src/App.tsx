import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SigninPage from "./Pages/SigninPage";
import { AuthProvider } from "./Contexts/AuthContexts";
import ProtectedRouter from "./Components/ProtectedRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import PrayBoardPage from "./Pages/PrayBoardPage";
import PostViewPage from "./Pages/PostViewPage";
import WorkbookPage from "./Pages/WorkbookPage";
import CoursesPage from "./Pages/CoursesPage";

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
            <Route
              path="/pray"
              element={
                <ProtectedRouter>
                  <PrayBoardPage />
                </ProtectedRouter>
              }
            />
            <Route
              path="/post"
              element={
                <ProtectedRouter>
                  <PostViewPage />
                </ProtectedRouter>
              }
            />
            <Route
              path="/workbook"
              element={
                <ProtectedRouter>
                  <WorkbookPage />
                </ProtectedRouter>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRouter>
                  <CoursesPage />
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
