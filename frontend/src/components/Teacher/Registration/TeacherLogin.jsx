import React, { useState, useEffect } from "react";
// import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./TeacherRegistration.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import {teacherLogin, clearErrors} from "../../../actions/teacherAction"
import { useAlert } from "react-alert";
import Navbar from "../../Home/Navbar";

const TeacherLogin = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.teacher
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(teacherLogin(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error && error !== "Please login to access this resource") {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/tdashboard");
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
          <div className="ul-rc">
            <div className="rc-rd">
              <span className="text-box">Teacher</span> Login
            </div>
            <input
              type="text"
              placeholder="Email Address"
              className="rc-itx"
              required
              name="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="rc-itx"
              required
              name="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <span className="rc-fp">Forgot Password?</span>

            <div className="rc-rdiv">
              <button className="rc-rb" onClick={loginSubmit}>
                Log In
              </button>
              <Link to="/tregistration">
                <span className="rc-lh">or Register here</span>
              </Link>
            </div>
          </div>
        </div>
        </>
       
      )}
    </>
  );
};

export default TeacherLogin;
