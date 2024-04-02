import React, { useEffect, useState } from "react";
import "./FormDetails.css";
import { getFormDetails, deleteForm } from "../../../../actions/formAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Loading from "../../../Loading/Loading";
import { useAlert } from "react-alert";
import { FORM_DELETE_RESET } from "../../../../constants/formConstant";
import { useNavigate } from "react-router-dom";

const FormDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  const alert = useAlert();

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    dispatch(getFormDetails(id));
  }, [dispatch, id]);

  const { loading, form } = useSelector((state) => state.formDetails);

  const { error, isDeleted } = useSelector((state) => state.updateForm);

  const submittedAt = new Date(form.submittedAt);
  const day = submittedAt.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = submittedAt.getMonth();
  const year = submittedAt.getFullYear();
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  let backgroundColor;
  let borderColor;

  switch (form.status) {
    case "Pending":
      backgroundColor = "rgba(226, 204, 175, 1)";
      borderColor = "2px solid rgba(254, 190, 105, 1)";
      break;
    case "Rejected":
      backgroundColor = "rgba(255, 178, 176, 1)";
      borderColor = "2px solid rgba(242, 99, 95, 1)";
      break;
    case "Approved":
      backgroundColor = "rgba(185, 214, 183, 1)";
      borderColor = "2px solid rgba(116, 198, 109, 1)";
      break;
    default:
      backgroundColor = "white";
      borderColor = "none";
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Achievement Deleted Successfully");
      navigate("/sdashboard");
      dispatch({ type: FORM_DELETE_RESET });
      window.location.reload();
    }
  }, [dispatch, id, navigate, alert, error, isDeleted]);

  const handleSubmitNo = () => {
    setConfirm(false);
  };

  const handleSubmitYes = () => {
    setConfirm(true);
  };

  const deleteAchievement = () => {
    dispatch(deleteForm(id));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {confirm ? (
            <>
              <div className="cd-mc">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span className="cnf-text">
                    Are you sure you want to delete this achievement?
                  </span>
                  <div className="confirm-div">
                    <button className="cnf-no" onClick={handleSubmitNo}>
                      NO
                    </button>
                    <button className="cnf-yes" onClick={deleteAchievement}>
                      YES, DELETE IT
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="fd-mc">
                <div
                  className="form-dc"
                  style={{
                    backgroundColor: `${backgroundColor}`,
                    border: `${borderColor}`,
                  }}
                >
                  <div className="dc-img">
                    {form.proof ? (
                      <>
                        <img
                          src={form.proof[0].url}
                          alt=""
                          className="dc-image"
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="dc-name">
                    <span>{form.achievementName}</span>

                    <span className="dc-fd">{formattedDate}</span>
                  </div>
                  <div className="dc-desc">{form.description}</div>
                </div>
              </div>
              {form.status === "Pending" ? (
                <div className="acb-div">
                  <button className="da-btn" onClick={handleSubmitYes}>
                    delete achievement
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default FormDetails;
