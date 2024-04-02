import React from "react";
import "./Forms.css";
import FormCard from "../FormCard/FormCard";
import { Link } from "react-router-dom";

const Forms = ({ forms, title }) => {
  return (
    <>
      {forms?.length > 0 ? (
        <>
          {" "}
          <div className="form-mc">
            {forms?.map((form) => (
              <FormCard key={form._id} form={form} address="form" />
            ))}
          </div>
          <div className="acb-div">
            <Link to="/achievementform">
              <button className="ana-btn">Add new Achievement</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="cd-mc">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {title === "All Applications" ? (
                <span>
                  You have not added any achievements, submit an application to
                  add one.
                </span>
              ) : (
                <span className="cnf-text">
                  You have no {title} Applications
                </span>
              )}
            </div>
          </div>
          <div className="acb-div">
            <Link to="/achievementform">
              <button className="ana-btn">Add new Achievement</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Forms;
