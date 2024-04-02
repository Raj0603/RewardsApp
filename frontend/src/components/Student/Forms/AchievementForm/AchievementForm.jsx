import React, { useState, useEffect } from "react";
import "./AchievementForm.css";
import { useSelector, useDispatch } from "react-redux";
import { createForm, clearErrors } from "../../../../actions/formAction";
import Loading from "../../../Loading/Loading";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "react-alert";

const AchievementForm = () => {
  const { loading, student } = useSelector((state) => state.student);

  const { error, success } = useSelector((state) => state.newForm);

  const alert = useAlert();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    teacherName: "",
    achievementName: "",
    category: "",
    description: "",
  });

  const { teacherName, achievementName, category, description } = form;

  const [proof, setProof] = useState("");
  const [proofPreview, setProofPreview] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Achievement Submitted Successfully");
      navigate("/sdashboard");
      window.location.reload();
    }
  }, [dispatch, alert, error, navigate, success]);

  const formSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("teacherName", teacherName);
    myForm.set("achievementName", achievementName);
    myForm.set("category", category);
    myForm.set("description", description);
    myForm.set("proof", proof);

    dispatch(createForm(myForm));
  };

  const formDataChange = (e) => {
    if (e.target.name === "proof") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProofPreview(reader.result);
          setProof(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="af-mc">
            <div className="na-text">
              <span>New Achievement</span>
              <Link to="/sdashboard">
                <span>X</span>
              </Link>
            </div>
            <input
              type="text"
              name="teacherName"
              value={teacherName}
              onChange={formDataChange}
              placeholder="Teacher Name"
              className="af-label"
            />
            <input
              type="text"
              name="achievementName"
              value={achievementName}
              onChange={formDataChange}
              placeholder="Achievement Name"
              className="af-label"
            />
            <select
              name="category"
              value={category}
              onChange={formDataChange}
              className="af-label"
            >
              <option value="">Select a category</option>
              <option value="Research Paper Published in Reputed Journal or Conference">Research Paper Published in Reputed Journal or Conference</option>
              <option value="Securing Job Offer through Campus Placements">Securing Job Offer through Campus Placements</option>
              <option value="Securing Job Offer Off-Campus">Securing Job Offer Off-Campus</option>
              <option value="Coding Competition Winner">Coding Competition Winner</option>
              <option value="Coding Competition Runner Up">Coding Competition Runner Up</option>
              <option value="Tech Innovation Competition">Tech Innovation Competition</option>
              <option value="Tech Innovation Competition Runner Up">Tech Innovation Competition Runner Up</option>
              <option value="Hackathon Winner">Hackathon Winner</option>
              <option value="Hackathon Runner Up">Hackathon Runner Up</option>
              <option value="Robotics Competition Winner">Robotics Competition Winner</option>
              <option value="Robotics Competition Runner Up">Robotics Competition Runner Up</option>
              <option value="Aerospace Engineering Competition Winner">Aerospace Engineering Competition Winner</option>
              <option value="Aerospace Engineering Competition Runner Up">Aerospace Engineering Competition Runner Up</option>
              <option value="Engineering Design Challenge Winner">Engineering Design Challenge Winner</option>
              <option value="Engineering Design Challenge Runner Up">Engineering Design Challenge Runner Up</option>
              <option value="Exhibitor at Science and Engineering Fair">Exhibitor at Science and Engineering Fair</option>
              <option value="Math Olympiad Winner/Runner Up">Math Olympiad Winner/Runner Up</option>
              <option value="Science Olympiad Winner/Runner Up">Science Olympiad Winner/Runner Up</option>
              <option value="Startup Initiative Competitions Winner/Runner Up">Startup Initiative Competitions Winner/Runner Up</option>
              <option value="Startup Initiative Competitions Participant">Startup Initiative Competitions Participant</option>
              <option value="Business Plan Competitions">Business Plan Competitions</option>
              <option value="Highest GPA in Class for a Given Semester">Highest GPA in Class for a Given Semester</option>
              <option value="Environmental Conservation Project Development">Environmental Conservation Project Development</option>
              <option value="Problem-Solving Competition Winner">Problem-Solving Competition Winner</option>
              <option value="Problem-Solving Competition Runner Up">Problem-Solving Competition Runner Up</option>
              <option value="Interdisciplinary Research">Interdisciplinary Research</option>
              <option value="Design Challenges">Design Challenges</option>
              <option value="Language Proficiency Challenges">Language Proficiency Challenges</option>
              <option value="Sports Competition">Sports Competition</option>
              <option value="Fitness Competition">Fitness Competition</option>
              <option value="Cultural Festival Competition">Cultural Festival Competition</option>
              <option value="Performing Arts Competition">Performing Arts Competition</option>
              <option value="Visual Arts Competition">Visual Arts Competition</option>
              <option value="Creative Writing Competition">Creative Writing Competition</option>
              <option value="Speech & Debate Competitions">Speech & Debate Competitions</option>
              <option value="Literary Magazine Publication">Literary Magazine Publication</option>
              <option value="Spelling Bee">Spelling Bee</option>
              <option value="Volunteer Work">Volunteer Work</option>
              <option value="Social Impact Initiative">Social Impact Initiative</option>
              <option value="Fundraising Initiative">Fundraising Initiative</option>
              <option value="Entrepreneurial Endeavour">Entrepreneurial Endeavour</option>
              <option value="Community Organizing">Community Organizing</option>
              {/* <option value="Early Submission of Assignments">Early Submission of Assignments</option> */}
              <option value="100% Attendance">100% Attendance</option>
              <option value="Perfect Score in Internal Assessment">Perfect Score in Internal Assessment</option>
              {/* <option value="Active Participation and Effort in Committee">Active Participation and Effort in Committee</option>
              <option value="Active Participation in Class">Active Participation in Class</option>
              <option value="Exceptional Creativity in Assignments">Exceptional Creativity in Assignments</option>
              <option value="Excellent Behavioural Conduct">Excellent Behavioural Conduct</option>
              <option value="Outstanding Presentation Skills">Outstanding Presentation Skills</option>
              <option value="Contributing Positively to Group Projects">Contributing Positively to Group Projects</option> */}
              <option value="External Course Completion">External Course Completion</option>
            </select>

            <textarea
              name="description"
              value={description}
              onChange={formDataChange}
              placeholder="Description"
              className="af-label"
            ></textarea>
            <span className="upload-span">Upload Proof eg: Certificate</span>
            <input
              type="file"
              name="proof"
              onChange={formDataChange}
              accept="image/*"
            />
            {proofPreview && (
              <img src={proofPreview} alt="" className="af-pp" />
            )}
            {/* <button className="db-aab" >Submit For Approval</button> */}
          </div>
          <div className="afs-div">
            <Link to="/achievementform">
              <button className="afs-btn" onClick={formSubmit}>
                Submit for approval
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AchievementForm;
