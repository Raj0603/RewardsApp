import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teacherForm } from "../../../../actions/formAction";
import { useAlert } from "react-alert";
import FormInfoTemplate from "../FormInfoTemplate/FormInfoTemplate";
import Loading from "../../../Loading/Loading";
import EmptyInfoTemplate from "../FormInfoTemplate/EmptyInfoTemplate";

const RejectedForms = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, forms } = useSelector((state) => state.allForm);

  const rejectedForms = forms?.filter((form) => form.status === "Rejected");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(teacherForm());
  }, [dispatch, error, alert]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
           {rejectedForms.length > 0 ? (
            <FormInfoTemplate forms={rejectedForms} />
          ) : (
        
            <EmptyInfoTemplate title="no forms to approve" />
          )}
        </>
      )}
    </div>
  );
};

export default RejectedForms;
