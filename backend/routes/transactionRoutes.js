const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const {
  teacherTransaction,
  studentTransaction,
  getStudentTransaction,
  rewardTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.route("/ttransaction").post(isAuthenticated, teacherTransaction);

router.route("/studenttransaction").post(isAuthenticated, studentTransaction);

router.route("/rewardtransaction").post(isAuthenticated, rewardTransaction);

router.route("/gettransaction").get(isAuthenticated, getStudentTransaction);


module.exports = router;