const Course = require("../models/courseModel");

const createCourse = async (req, res) => {
  const { title, description, category, duration } = req.body;
  const course = await Course.create({ title, description, category, duration, createdBy: req.user._id });
  res.status(201).json(course);
};

const getCourses = async (req, res) => {
  const courses = await Course.find().populate("createdBy", "fullName");
  res.json(courses);
};

const updateCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  Object.assign(course, req.body);
  await course.save();
  res.json(course);
};

const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  await course.remove();
  res.json({ message: "Course deleted" });
};

const enrollCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  if (!course.learners.includes(req.user._id)) {
    course.learners.push(req.user._id);
    await course.save();
  }
  res.json({ message: "Enrolled successfully" });
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse, enrollCourse };
