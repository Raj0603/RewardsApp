import React from "react";

const InfoBox = ({ number, title }) => {
  return (
    <div>
      <div className="td-cards">
        <span className="card-number">{number?.length}</span>
        <span className="card-det">{title}</span>
      </div>
    </div>
  );
};

export default InfoBox;
