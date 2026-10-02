import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CourseListPage from "./pages/CourseListPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import AdminCoursesPage from "./pages/AdminCoursesPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* your routes */}
      </Routes>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/admin" element={<AdminCoursesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
