import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import "./Warnings.css";
import WarningCard from "./WarningCard";
import { useNavigate } from "react-router-dom";

const Warnings = () => {
  const { loading, error, student } = useSelector((state) => state.student);
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {student.warnings.length > 0 ? (
            <div className="warning-mc">
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>Warnings Received</h2>

                <h2
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/sdashboard");
                  }}
                >
                  X
                </h2>
              </span>
              {student.warnings.map((warning) => (
                <WarningCard key={warning._id} warning={warning} />
              ))}
            </div>
          ) : (
            <>
              <div className="warning-mc">
                
                  <span
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h2>Warnings Received</h2>

                    <h2
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/sdashboard");
                      }}
                    >
                      X
                    </h2>
                  </span>
                  <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <span className="cnf-text" style={{marginTop:"25vh"}}>
                    You have not received any warnings yet.
                  </span>

                  </div>
                </div>
              
            </>
          )}
        </>
      )}
    </>
  );
};

export default Warnings;