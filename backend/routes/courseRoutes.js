// courseRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createCourse, getCourses, updateCourse, deleteCourse, enrollCourse } = require("../controllers/courseController");

const router = express.Router();

router.post("/", protect, authorizeRoles("Admin"), createCourse);
router.get("/", protect, getCourses);
router.put("/:id", protect, authorizeRoles("Admin"), updateCourse);
router.delete("/:id", protect, authorizeRoles("Admin"), deleteCourse);
router.post("/:id/enroll", protect, authorizeRoles("Learner"), enrollCourse);

module.exports = router;
