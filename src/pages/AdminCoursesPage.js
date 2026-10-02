import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    status: "Draft",
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch all courses (Admin sees both Draft + Published)
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update Course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await axios.put(
          `http://localhost:5000/api/courses/${editingCourse._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:5000/api/courses", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({
        title: "",
        description: "",
        category: "",
        duration: "",
        status: "Draft",
      });
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error.response?.data || error);
    }
  };

  // Edit Course
  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration,
      status: course.status,
    });
  };

  // Delete Course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Course Management</h1>

      {/* Course Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-2xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingCourse ? "Edit Course" : "Create New Course"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 4 weeks)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingCourse ? "Update Course" : "Create Course"}
        </button>
      </form>

      {/* Course List */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-t">
                  <td className="p-3">{course.title}</td>
                  <td className="p-3">{course.category}</td>
                  <td className="p-3">{course.duration}</td>
                  <td className="p-3">{course.status}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminCoursesPage;
