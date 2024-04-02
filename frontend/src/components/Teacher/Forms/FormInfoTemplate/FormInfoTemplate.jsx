import React, { useEffect } from "react";
import "../../TeacherDashboard/Dashboard.css";
import Navbar from "../../../Home/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../Loading/Loading";
import { useAlert } from "react-alert";
import { teacherForm } from "../../../../actions/formAction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutTeacher, clearErrors } from "../../../../actions/teacherAction";
import form from "../../../../assets/forms.svg";
import InfoBox from "../../TeacherDashboard/InfoBox"
import FormCard from "../../../Student/Forms/FormCard/FormCard";

const FormInfoTemplate = ({forms}) => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { loading, isAuthenticated } = useSelector((state) => state.teacher);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated) {
        navigate("/tlogin");
      }
    }
  }, [dispatch,  alert, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="teacher-dashboard">
          <Navbar
            isAuthenticated={isAuthenticated}
            logout={logoutTeacher}
            address="tlogin"
            home="tdashboard"
          />
          <div className="td-mc">
            <div className="td-lc">
              <div className="sd-rd">
                <span className="text-box">Teacher</span> Dashboard
              </div>
              <span className="line-span"></span>

              <div className="image-container">
                
                <InfoBox number={forms} title="Number of forms pending" />

                <Link to="/tdashboard">
                  <button className="verify-form">go back</button>
                </Link>
              </div>
            </div>
            
            <div className="vf-rc">
              {forms?.map((form) => (
                <FormCard key={form._id} form={form} address="tform" />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormInfoTemplate;
