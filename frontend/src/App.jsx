import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserRegistration from "./components/Student/Registration/UserRegistration";
import UserLogin from "./components/Student/Registration/UserLogin";
import Dashboard from "./components/Student/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import store from "./Store";
import { loadStudent } from "./actions/studentAction";
import { useEffect } from "react";
import TeacherDashboard from "./components/Teacher/TeacherDashboard/TeacherDashboard";
import TeacherRegistration from "./components/Teacher/Registration/TeacherRegistration";
import TeacherLogin from "./components/Teacher/Registration/TeacherLogin";
import { loadTeacher } from "./actions/teacherAction";
import AchievementForm from "./components/Student/Forms/AchievementForm/AchievementForm";
// import StudentPendingForm from "./components/Student/Forms/PendingForms/PendingForm";
// import TeacherPendingForm from "./components/Teacher/TeacherDashboard/PendingForm";
import PendingForm from "./components/Teacher/Forms/FormList/PendingForm";
import ApprovedForms from "./components/Teacher/Forms/FormList/ApprovedForms";
import RejectedForms from "./components/Teacher/Forms/FormList/RejectedForms";
// import AllForms from "./components/Student/Dashboard/AllForms";
import Home from "./components/Home/Home";
import RegisterAs from "./components/Home/RegisterAs";
import Forms from "./components/Student/Forms/FormComponent/Forms";
import FormDetails from "./components/Student/Forms/FormDetails/FormDetails";
import AboutUs from "./components/About/AboutUs";
import TFormDetails from "./components/Teacher/Forms/FormDetails/FormDetails";
import AllForms from "./components/Teacher/Forms/FormList/AllForms";
import LoginAs from "./components/Home/LoginAs";
import Wallet from "./components/Student/Wallet/Wallet";
import Warnings from "./components/Student/Warnings/Warnings";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      location.pathname !== "/studentregistration" &&
      location.pathname !== "/studentlogin"
    ) {
      store.dispatch(loadStudent());
    }

    if (
      location.pathname !== "/tregistration" &&
      location.pathname !== "/tlogin"
    ) {
      store.dispatch(loadTeacher());
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/studentregistration"
          element={<UserRegistration />}
        />
        <Route exact path="/studentlogin" element={<UserLogin />} />
        <Route
          exact
          path="/sdashboard"
          element={<Dashboard Component={Forms} />}
        />
        <Route
          exact
          path="/achievementform"
          element={<Dashboard Component={AchievementForm} />}
        />
        <Route
          exact
          path="/form/:id"
          element={<Dashboard Component={FormDetails} />}
        />
        <Route
          exact
          path="/warnings"
          element={<Dashboard Component={Warnings} />}
        />

        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/tregistration" element={<TeacherRegistration />} />
        <Route exact path="/tlogin" element={<TeacherLogin />} />
        <Route exact path="/tdashboard" element={<TeacherDashboard />} />
        <Route exact path="/teacherforms" element={<AllForms />} />
        <Route exact path="/tform/:id" element={<TFormDetails />} />
        <Route exact path="/pendingform" element={<PendingForm />} />
        <Route exact path="/approvedforms" element={<ApprovedForms />} />
        <Route exact path="/rejectedforms" element={<RejectedForms />} />
        <Route exact path="/register" element={<RegisterAs />} />
        <Route exact path="/login" element={<LoginAs />} />
      </Routes>
    </>
  );
}

export default App;
