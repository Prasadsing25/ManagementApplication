import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course, onEnroll }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-700 mb-2">{course.description}</p>
      <p className="text-sm text-gray-500 mb-2">
        Category: {course.category} | Duration: {course.duration}
      </p>
      <p className={`text-sm font-medium mb-3 ${
        course.status === "Published" ? "text-green-600" : "text-yellow-600"
      }`}>
        Status: {course.status}
      </p>

      <div className="flex justify-between items-center">
        <Link
          to={`/courses/${course._id}`}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          View Details
        </Link>

        {onEnroll && course.status === "Published" && (
          <button
            onClick={() => onEnroll(course._id)}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Enroll
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
