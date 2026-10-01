const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware"); // ✅ correct import
const { enrollInCourse, getMyCourses } = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/:id/enroll", protect, authorizeRoles("Learner"), enrollInCourse);
router.get("/my", protect, authorizeRoles("Learner"), getMyCourses);

module.exports = router;
