import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Navbar from "../../Home/Navbar";
// import profile from "../../../assets/profile.png";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import studentLogo from "../../../assets/profile.svg";
import { logoutStudent } from "../../../actions/studentAction";
import { studentForm } from "../../../actions/formAction";
import { clearErrors } from "../../../actions/teacherAction";
import { getBalance } from "../../../actions/walletAction";

const Dashboard = ({ Component }) => {
  const dispatch = useDispatch();

  const { loading, student, isAuthenticated } = useSelector(
    (state) => state.student
  );

  const { fetching, studentBalance } = useSelector(
    (state) => state.studentBalance
  );

  const {
    loading: formLoading,
    forms,
    error,
  } = useSelector((state) => state.allForm);

  const approvedForms = forms?.filter((form) => form.status === "Approved");
  const pendingForms = forms?.filter((form) => form.status === "Pending");
  const rejectedForms = forms?.filter((form) => form.status === "Rejected");
  const [activeTab, setActiveTab] = useState("Approved");

  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated) {
        navigate("/studentlogin");
      }

      if(student?.role === "service"){
        navigate("/wallet")
      }

      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (!fetching) {
        dispatch(getBalance(student?.walletId));
      }
      dispatch(studentForm());
    }
  }, [loading, navigate, isAuthenticated, dispatch, clearErrors, studentForm]);

  const [activeForms, setActiveForms] = useState(approvedForms);

  const handleClick = (tabName) => {
    setActiveTab(tabName);
    navigate("/sdashboard");
    switch (tabName) {
      case "All Applications":
        setActiveForms(forms);
        break;
      case "Pending":
        setActiveForms(pendingForms);
        break;
      case "Rejected":
        setActiveForms(rejectedForms);
        break;
      case "Approved":
        setActiveForms(approvedForms);
        break;
      default:
        setActiveForms(approvedForms);
        break;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="user-mc">
          <Navbar
            isAuthenticated={isAuthenticated}
            logout={logoutStudent}
            address="studentlogin"
            home="sdashboard"
          />

          <div className="sd-mc">
            <div className="uc-lc">
              <div className="sd-rd">
                <span className="text-box">Student</span> Dashboard
              </div>
              <span className="line-span"></span>
              <div className="sd-studentdetails">
                <div className="sd-sdl">
                  <img src={studentLogo} alt="" className="profile-img" />
                </div>
                <div className="sd-sdr">
                  <span className="details-span">{student?.name}</span>
                  <span className="details-span">
                    Total Achievements: {approvedForms?.length}
                  </span>
                  <span className="details-span">
                    Total Coins: {studentBalance}
                  </span>
                </div>
              </div>
              <span className="line-span"></span>
              <div className="sd-al">
                <div
                  className={`achievement-list ${
                    activeTab === "All Applications" && "active-tab"
                  }`}
                  onClick={() => handleClick("All Applications")}
                >
                  All Applications ({forms?.length}){" "}
                  {activeTab === "All Applications" && ">"}
                </div>
                <div
                  className={`achievement-list ${
                    activeTab === "Pending" && "active-tab"
                  }`}
                  onClick={() => handleClick("Pending")}
                >
                  Pending ({pendingForms?.length}){" "}
                  {activeTab === "Pending" && ">"}
                </div>
                <div
                  className={`achievement-list ${
                    activeTab === "Rejected" && "active-tab"
                  }`}
                  onClick={() => handleClick("Rejected")}
                >
                  Rejected ({rejectedForms?.length}){" "}
                  {activeTab === "Rejected" && ">"}
                </div>
                <div
                  className={`achievement-list ${
                    activeTab === "Approved" && "active-tab"
                  }`}
                  onClick={() => handleClick("Approved")}
                >
                  Approved ({approvedForms?.length}){" "}
                  {activeTab === "Approved" && ">"}
                </div>
              </div>
            </div>
            <div className="uc-rc">
              {formLoading ? (
                <Loading />
              ) : (
                <Component forms={activeForms} title={activeTab} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
