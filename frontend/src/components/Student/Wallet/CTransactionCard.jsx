import React from "react";

const CTransactionCard = ({ data }) => {
  // Destructuring props here
  // Convert the timestamp to a Date object
  const date = new Date(data.paidAt);

  // Options for formatting the date and time
  const options = {
    month: "long", // Display full month name (e.g., March)
    day: "numeric", // Display day of the month (e.g., 24)
    year: "numeric", // Display year (e.g., 2024)
    hour: "numeric", // Display hour (e.g., 7)
    minute: "2-digit", // Display minute with leading zero (e.g., 02)
    hour12: true, // Use 12-hour format (e.g., AM/PM)
  };

  // Format the date and time
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="transaction-details">
      <div className="td-left">
        <span style={{ fontWeight: "700", fontSize: "larger" }}>
          {data.senderName}
        </span>
        <span style={{ fontSize: "13px", fontWeight: "600" }}>
          {formattedDate}
        </span>
      </div>
      <div className="td-right">+{data.amount}</div>
    </div>
  );
};

export default CTransactionCard;