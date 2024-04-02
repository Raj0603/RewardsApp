import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teacherForm } from "../../../../actions/formAction";
import { useAlert } from "react-alert";
import FormInfoTemplate from "../FormInfoTemplate/FormInfoTemplate";
import Loading from "../../../Loading/Loading";
// import FormTemplate from '../FormTemplate/FormTemplate';

const AllForms = () => {
  const dispatch = useDispatch();

  const { loading, error, forms } = useSelector((state) => state.allForm);

  const alert = useAlert();

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
          <FormInfoTemplate forms={forms} title="0 forms" />
        </>
      )}
    </div>
  );
};

export default AllForms;
