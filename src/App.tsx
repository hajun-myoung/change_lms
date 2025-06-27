import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SigninPage from "./Pages/SigninPage";
import { AuthProvider } from "./Contexts/AuthContexts";
import ProtectedRouter from "./Components/ProtectedRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import PrayBoardPage from "./Pages/PrayBoardPage";
import WorkbookPage from "./Pages/WorkbookPage";
import CoursesPage from "./Pages/CoursesPage";
import SyllabusPage from "./Pages/SyllabusPage";
import SyllabusDetailPage from "./Pages/SyllabusDetailPage";
import AnnouncementViewPage from "./Pages/AnnouncementViewPage";

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
              path="/announcement/:id"
              element={
                <ProtectedRouter>
                  <AnnouncementViewPage />
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
            <Route
              path="/syllabus/"
              element={
                <ProtectedRouter>
                  <SyllabusPage />
                </ProtectedRouter>
              }
            />
            <Route
              path="/syllabus/:id"
              element={
                <ProtectedRouter>
                  <SyllabusDetailPage />
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
