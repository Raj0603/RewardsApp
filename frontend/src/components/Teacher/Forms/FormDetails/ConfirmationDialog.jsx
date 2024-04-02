import React from "react";
import "./ConfirmationDialog.css";

const ConfirmationDialog = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="confirmation-dialog-container">
      <div className="confirmation-dialog">
        <p>{message}</p>
        <div className="confirmation-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
