import React from "react";
import "./FormCard.css";
import { Link } from "react-router-dom";

const FormCard = ({ form, address }) => {
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

  return (
    <>
          <Link to={`/${address}/${form._id}`}>
        <div
          className="scard"
          style={{
            backgroundColor: `${backgroundColor}`,
            border: `${borderColor}`,
          }}
        >
          <div className="scard-image">
            <img
              src={form.proof[0].url}
              alt="Achievement"
              className="sfc-img"
            />
          </div>
          <span className="scard-title">{form.achievementName}</span>
          <span className="scard-date">{formattedDate}</span>
        </div>
      </Link>
    </>
  );
};

export default FormCard;
