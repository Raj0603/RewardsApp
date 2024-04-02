import React, { useState, useEffect } from "react";
// import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./UserRegistration.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { studentRegister, clearErrors } from "../../../actions/studentAction";
import { useAlert } from "react-alert";
import Navbar from "../../Home/Navbar";
import user from "../../../assets/user.svg";

const UserRegistration = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.student
  );

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    className: "",
    walletId: "",
  });

  const { name, email, password, className, walletId } = student;

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

  const handleRegistration = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!name || !email || !password || !className || !walletId ) {
      alert.error("Please fill in all the details.");
      return;
    }

    if (isEmailValid && isPasswordValid) {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("className", className);
      myForm.set("walletId", walletId);
      dispatch(studentRegister(myForm));
    }
  };

  const studentRegisterDataChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (error && error !== "Please login to access this resource") {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/sdashboard");
      window.location.reload();
    }
  }, [error, alert, dispatch, navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="user-mc">
          <Navbar />
          <div className="ur-rc">
            <div className="rc-left">
              <input
                type="text"
                placeholder="Full Name"
                className="rc-itx"
                required
                name="name"
                value={name}
                onChange={studentRegisterDataChange}
              />

              <input
                type="text"
                placeholder="Your Class eg: BE IT"
                className="rc-itx"
                required
                name="className"
                value={className}
                onChange={studentRegisterDataChange}
              />

              <input
                type="text"
                placeholder="Institute Email Id"
                className="rc-itx"
                required
                name="email"
                value={email}
                onChange={studentRegisterDataChange}
              />
              <div className="rc-eem">{emailError}</div>

              <input
                type="password"
                placeholder="Password"
                className="rc-itx"
                required
                name="password"
                value={password}
                onChange={studentRegisterDataChange}
              />
                <div className="rc-pem">{passwordError}</div>
              <input
                type="text"
                placeholder="Enter Metamask wallet id"
                className="rc-itx"
                required
                name="walletId"
                value={walletId}
                onChange={studentRegisterDataChange}
              />
              <div className="rc-rdiv">
                <button className="rc-rb" onClick={handleRegistration}>
                  Register
                </button>
                <Link to="/studentlogin">
                <span className="rc-lh">or Login here</span>
                </Link>
              </div>
            </div>
            <div className="rc-right">
              <div className="rc-rd">
                <span className="text-box">Student</span> Registration
              </div>
              <img src={user} alt="" className="user-img" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRegistration;
