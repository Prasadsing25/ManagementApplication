import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get(`/courses/${id}`).then(res => setCourse(res.data));
  }, [id]);

  const handleEnroll = async () => {
    try {
      await API.post(`/enrollments/${id}/enroll`);
      alert("Enrolled successfully");
    } catch (err) {
      alert("Enrollment failed");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl">{course.title}</h2>
      <p>{course.description}</p>
      <p>Category: {course.category}</p>
      <p>Duration: {course.duration}</p>
      <button onClick={handleEnroll} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Enroll
      </button>
    </div>
  );
}
