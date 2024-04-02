const express = require("express");
const {
  registerStudent,
  loginStudent,
  logout,
  forgotPassword,
  resetPassword,
  getStudentDetails,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateProfile,
  updatePassword,
} = require("../controllers/studentController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/sregister").post(registerStudent);

router.route("/slogin").post(loginStudent);

router.route("/spassword/forgot").post(forgotPassword);

router.route("/spassword/reset/:token").put(resetPassword);

router.route("/slogout").get(logout);

router.route("/sme").get(isAuthenticated, getStudentDetails);

router.route("/spassword/update").put(isAuthenticated, updatePassword);

router.route("/sme/update").put(isAuthenticated, updateProfile);

router
  .route("/sadmin/students")
  .get(isAuthenticated, authorizeRoles("admin"), getAllStudents);

router
  .route("/sadmin/student/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleStudent)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteStudent);

module.exports = router;
