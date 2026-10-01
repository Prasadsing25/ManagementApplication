const Enrollment = require("../models/enrollmentModel");
const Course = require("../models/courseModel");

// Enroll in Course
const enrollInCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  if (course.status !== "Published")
    return res.status(400).json({ message: "Cannot enroll in Draft course" });

  const existing = await Enrollment.findOne({ learner: req.user._id, course: course._id });
  if (existing) return res.status(400).json({ message: "Already enrolled" });

  const enrollment = await Enrollment.create({ learner: req.user._id, course: course._id });
  res.status(201).json({ message: "Enrolled successfully", enrollment });
};

// Get My Enrolled Courses
const getMyCourses = async (req, res) => {
  const enrollments = await Enrollment.find({ learner: req.user._id })
    .populate("course", "title description category duration status");
  res.json(enrollments.map(e => e.course));
};

module.exports = { enrollInCourse, getMyCourses };
