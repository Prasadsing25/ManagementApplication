const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema({
  learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
}, { timestamps: true });

enrollmentSchema.index({ learner: 1, course: 1 }, { unique: true }); // prevent duplicates

module.exports = mongoose.model("Enrollment", enrollmentSchema);