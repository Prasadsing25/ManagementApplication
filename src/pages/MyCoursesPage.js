import { useEffect, useState } from "react";
import API from "../api/axios";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/enrollments/my").then(res => setCourses(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">My Courses</h2>
      <ul>
        {courses.map(c => (
          <li key={c._id} className="border p-2 mb-2">{c.title}</li>
        ))}
      </ul>
    </div>
  );
}
