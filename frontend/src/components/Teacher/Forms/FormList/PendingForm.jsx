import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teacherForm } from "../../../../actions/formAction";
import { useAlert } from "react-alert";
import FormInfoTemplate from "../FormInfoTemplate/FormInfoTemplate";
import Loading from "../../../Loading/Loading";
import EmptyInfoTemplate from "../FormInfoTemplate/EmptyInfoTemplate";
// import FormTemplate from "../FormTemplate/FormTemplate";

const PendingForm = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, forms } = useSelector((state) => state.allForm);

  const pendingForms = forms?.filter((form) => form.status === "Pending");

  useEffect(() => {
    if (loading === false) {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(teacherForm());
    }
  }, [dispatch, error, alert]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {pendingForms.length > 0 ? (
            <FormInfoTemplate forms={pendingForms} />
          ) : (
            // <div>
            //   <div
            //     style={{
            //       display: "flex",
            //       flexDirection: "column",
            //       alignItems: "center",
            //       padding:"40px"
            //     }}
            //   >
            //     <span className="cnf-text">
            //       You have no Applications to approve.
            //     </span>
            //   </div>
            // </div>
            <EmptyInfoTemplate title="no forms to approve" />
          )}
        </>
      )}
    </div>
  );
};

export default PendingForm;
