import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

export default function CourseListPage({handleEnroll}) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        API.get("/courses").then(res => setCourses(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Available Courses</h2>
            <div className="grid grid-cols-3 gap-4">
                {courses.map(course => (
                    <div key={course._id} className="border p-4 rounded shadow">
                        <h3 className="text-lg font-bold">{course.title}</h3>
                        <p>{course.category}</p>
                        <Link to={`/courses/${course._id}`} className="text-blue-500">View Details</Link>
                        <CourseCard key={course._id} course={course} onEnroll={handleEnroll} />
                    </div>
                ))}
                

            </div>
        </div>
    );
}
