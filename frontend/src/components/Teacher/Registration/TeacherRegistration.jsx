import React, { useState, useEffect } from "react";
// import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./TeacherRegistration.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { useAlert } from "react-alert";
import { teacherRegister, clearErrors } from "../../../actions/teacherAction";
import Navbar from "../../Home/Navbar";
import user from "../../../assets/user.svg";

const TeacherRegistration = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.teacher
  );

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verified, setVerified] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  const [teacher, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    teacherWalletId:"",
  });

  const { name, email, password, teacherWalletId } = teacher;

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address.");
    return isValid;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValid = passwordRegex.test(password);
    setPasswordError(
      isValid
        ? ""
        : "Password should be at least 8 characters long and include at least one uppercase, one lowercase, and one digit."
    );
    return isValid;
  };

  const verifyCode = () => {
    if (secretCode === "Teacher@1234") {
      setVerified(true);
    } else {
      alert.error("Incorrect Code");
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!name || !email || !password || !teacherWalletId) {
      alert.error("Please fill in all the details.");
      return;
    }

    if (isEmailValid && isPasswordValid) {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("teacherWalletId", teacherWalletId);
      dispatch(teacherRegister(myForm));
    }
  };

  const teacherRegisterDataChange = (e) => {
    setStudent({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (error && error !== "Please login to access this resource") {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/tdashboard");
      window.location.reload();
    }
  }, [error, alert, dispatch, navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="user-mc">
            <Navbar />
            <div className="ur-rc">
                {verified ? (
                  <>
              <div className="rc-left">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      className="rc-itx"
                      required
                      name="name"
                      value={name}
                      onChange={teacherRegisterDataChange}
                    />

                    <input
                      type="text"
                      placeholder="Institute Email Address"
                      className="rc-itx"
                      required
                      name="email"
                      value={email}
                      onChange={teacherRegisterDataChange}
                    />
                    <div className="ur-eem">{emailError}</div>

                    <input
                      type="password"
                      placeholder="Password"
                      className="rc-itx"
                      required
                      name="password"
                      value={password}
                      onChange={teacherRegisterDataChange}
                    />
                    <input
                      type="text"
                      placeholder="Enter your metamask wallet"
                      className="rc-itx"
                      required
                      name="teacherWalletId"
                      value={teacherWalletId}
                      onChange={teacherRegisterDataChange}
                    />
                    <div className="ur-pem">{passwordError}</div>
                    <div className="rc-rdiv">
                      <button className="rc-rb" onClick={handleRegistration}>
                        Register
                      </button>
                      <Link to="/tlogin">
                        <span className="rc-lh">or Login here</span>
                      </Link>
                    </div>
                    
              </div>
                  </>
                ) : (
                  <>
                  <div className="rc-left verify-div">

                  <span style={{fontSize:"larger"}}>Please Enter Security Key</span>
                    <input
                      type="text"
                      placeholder="Teacher Verification Code"
                      className="rc-vtx"
                      required
                      name="secretCode"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                    />

                    <button className="rc-rb" onClick={verifyCode}>
                      Verify
                    </button>
                  </div>
                  </>
                )}
              <div className="rc-right">
                <div className="rc-rd">
                  <span className="text-box">Teacher</span> Registration
                </div>
                <img src={user} alt="" className="user-img" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TeacherRegistration;
