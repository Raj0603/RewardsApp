const express = require("express");
const {
  registerTeacher,
  loginTeacher,
  logout,
  forgotPassword,
  resetPassword,
  getTeacherDetails,
  getAllTeachers,
  getSingleTeacher,
  deleteTeacher,
  updateProfile,
  updatePassword,
  warnStudents,
  increaseRewards,
} = require("../controllers/teacherController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/tregister").post(registerTeacher);

router.route("/tlogin").post(loginTeacher);

router.route("/tpassword/forgot").post(forgotPassword);

router.route("/tpassword/reset/:token").put(resetPassword);

router.route("/tlogout").get(logout);

router.route("/tme").get(isAuthenticated, getTeacherDetails);

router.route("/tpassword/update").put(isAuthenticated, updatePassword);

router.route("/tme/update").put(isAuthenticated, updateProfile);

router.route("/twarnings").put(isAuthenticated, warnStudents);

router.route("/increaserewards").put(isAuthenticated, increaseRewards);

router
  .route("/admin/teachers")
  .get(isAuthenticated, authorizeRoles("admin"), getAllTeachers);

router
  .route("/admin/teacher/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleTeacher)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteTeacher);

module.exports = router;
