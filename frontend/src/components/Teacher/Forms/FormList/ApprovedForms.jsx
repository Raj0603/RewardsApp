import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teacherForm } from "../../../../actions/formAction";
import { useAlert } from "react-alert";
import FormInfoTemplate from "../FormInfoTemplate/FormInfoTemplate";
import Loading from "../../../Loading/Loading";
import EmptyInfoTemplate from "../FormInfoTemplate/EmptyInfoTemplate";
// import FormTemplate from '../FormTemplate/FormTemplate';

const ApprovedForms = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, forms } = useSelector((state) => state.allForm);

  const approvedForms = forms?.filter((form) => form.status === "Approved");

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
          {approvedForms.length > 0 ? (
            <FormInfoTemplate forms={approvedForms} title="not approved any Applications"/>
          ) : (
            <EmptyInfoTemplate title="not approved any forms"/>
          )}
        </>
      )}
    </div>
  );
};

export default ApprovedForms;
