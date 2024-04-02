const express = require("express");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const { newForm, getStudentForm, getTeacherForm, updateForm, deleteForm, getFormDetails } = require("../controllers/formController");

const router = express.Router();

router.route("/sendform").post(isAuthenticated, newForm);

router.route("/sform").get(isAuthenticated, getStudentForm)

router.route("/tform").get(isAuthenticated, getTeacherForm)

router.route("/updateform/:id").put(isAuthenticated, updateForm);

router.route("/deleteform/:id").delete(isAuthenticated, deleteForm);

router.route("/formdetails/:id").get(isAuthenticated, getFormDetails)

module.exports = router;