import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Navbar from "../../Home/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  logoutTeacher,
  warnStudent,
  increaseRewards,
} from "../../../actions/teacherAction";
import form from "../../../assets/forms.svg";
import { teacherForm, clearErrors } from "../../../actions/formAction";
import { rewardTransactions } from "../../../actions/transactionAction";
import InfoBox from "./InfoBox";
import Web3 from "web3";
import { WARN_STUDENT_RESET } from "../../../constants/teacherConstant";
import { useAlert } from "react-alert";

const TeacherDashboard = () => {
  const { loading, isAuthenticated, teacher } = useSelector(
    (state) => state.teacher
  );

  const { warnError, success } = useSelector((state) => state.newWarning);

  const { error, forms } = useSelector((state) => state.allForm);

  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const [amount, setAmount] = useState();
  const [category, setCategory] = useState("");
  const [walletId, setWalletId] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  const approvedForms = forms?.filter((form) => form.status === "Approved");
  const pendingForms = forms?.filter((form) => form.status === "Pending");
  const rejectedForms = forms?.filter((form) => form.status === "Rejected");

  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated) {
        navigate("/tlogin");
      }
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(teacherForm());
    }
  }, [dispatch, teacherForm, navigate, isAuthenticated, loading]);

  useEffect(() => {
    if (!loading) {
      const coins = calculateCoins(category);
      setAmount(coins);
    }
    if (warnError) {
      alert.error(warnError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: WARN_STUDENT_RESET });
    }
  }, [loading, category, success, alert, dispatch]);

  const handleAmountChange = (event) => {
    setCategory(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const calculateCoins = (category) => {
    switch (category) {
      case "Early Submission of Assignments":
      case "Active Participation and Effort in Committee":
      case "Active Participation in Class":
      case "Exceptional Creativity in Assignments":
      case "Excellent Behavioural Conduct":
      case "Outstanding Presentation Skills":
      case "Contributing Positively to Group Projects":
        return 50;
      default:
        return 0;
    }
  };

  const FromTeacher = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const contract = new web3.eth.Contract(
        [
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "balances",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "studentWallet",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "fromStudent",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "studentWallet",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "fromTeacher",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        "0x46A1C385F4bC9807AceC6676e8419fbf55739b69"
      );
      await contract.methods
        // student wallet id, amount
        .fromTeacher(walletId, amount)
        .send({ from: accounts[0] });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRewardSubmit = async () => {
    await FromTeacher();

    const rdata = {
      amount: amount,
      studentWalletId: walletId,
    };

    dispatch(rewardTransactions(rdata));

    const amountData = new FormData();
    amountData.set("amount", amount);
    dispatch(increaseRewards(amountData));
  };

  const warningSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("email", email);
    myForm.set("reason", reason);

    dispatch(warnStudent(myForm));
    window.location.reload();
  };

  const totalRewards = [];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="teacher-dashboard">
          <Navbar
            isAuthenticated={isAuthenticated}
            logout={logoutTeacher}
            address="tlogin"
            home="tdashboard"
          />
          <div className="td-mc">
            <div className="td-lc">
              <div className="sd-rd">
                <span className="text-box">Teacher</span> Dashboard
              </div>
              <span className="line-span"></span>

              <div className="image-container">
                <img src={form} alt="" className="form-img" />

                <Link to="/pendingform">
                  <button className="verify-form">Verify Forms</button>
                </Link>
              </div>
            </div>
            <div className="td-rc">
              <div className="tdr-up">
                <Link to="/pendingform">
                  <InfoBox number={pendingForms} title="No of forms pending" />
                </Link>
                <Link to="/approvedforms">
                  <InfoBox
                    number={approvedForms}
                    title="No of forms approved"
                  />
                </Link>
                <Link to="/rejectedforms">
                  <InfoBox
                    number={rejectedForms}
                    title="No of forms rejected"
                  />
                </Link>
                <div className="td-cards">
                  <span className="card-number" style={{fontSize:"80px"}}>{teacher?.totalRewards}</span>
                  <span className="card-det">Total rewards granted</span>
                </div>
              </div>
              <div className="tdr-down">
                <div className="td-ws">
                  <span className="ws-text">Reward Student</span>
                  <input
                    type="text"
                    className="ws-input"
                    placeholder="Student Wallet Id"
                    value={walletId}
                    onChange={(e) => {
                      setWalletId(e.target.value);
                    }}
                  />
                  <select
                    name="category"
                    placeholder="Reason for Reward"
                    className="ws-input"
                    onChange={handleAmountChange}
                  >
                    <option value="">Reason for Reward</option>
                    <option value="Early Submission of Assignments">
                      Early Submission of Assignments
                    </option>
                    <option value="Active Participation and Effort in Committee">
                      Active Participation and Effort in Committee
                    </option>
                    <option value="Active Participation in Class">
                      Active Participation in Class
                    </option>
                    <option value="Exceptional Creativity in Assignments">
                      Exceptional Creativity in Assignments
                    </option>
                    <option value="Excellent Behavioural Conduct">
                      Excellent Behavioural Conduct
                    </option>
                    <option value="Outstanding Presentation Skills">
                      Outstanding Presentation Skills
                    </option>
                    <option value="Contributing Positively to Group Projects">
                      Contributing Positively to Group Projects
                    </option>
                  </select>
                  <div className="ws-btn">
                    <button className="ws-srb" onClick={handleRewardSubmit}>
                      Send Rewards
                    </button>
                  </div>
                </div>

                <div className="td-rs">
                  <span className="ws-text">Warn Student</span>
                  <input
                    type="text"
                    className="ws-input"
                    placeholder="Student Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <select
                    name="category"
                    placeholder="Reason for Reward"
                    className="ws-input"
                    value={reason}
                    onChange={handleReasonChange}
                  >
                    <option value="">Reason for Warning</option>
                    <option value="Submitting Incorrect Information for Achievement Verification">
                      Submitting Incorrect Information for Achievement
                      Verification
                    </option>
                    <option value="Attempting to Submit the Same Achievement Information Twice">
                      Attempting to Submit the Same Achievement Information
                      Twice
                    </option>
                    <option value="Plagiarism in Academic Work">
                      Plagiarism in Academic Work
                    </option>
                    <option value="Academic Misconduct">
                      Academic Misconduct
                    </option>
                    <option value="Disruptive Behavior in Class">
                      Disruptive Behavior in Class
                    </option>
                    <option value="Violating School Policies">
                      Violating School Policies
                    </option>
                    <option value="Bullying or Harassment">
                      Bullying or Harassment
                    </option>
                    <option value="Cheating in Examinations">
                      Cheating in Examinations
                    </option>
                           
                  </select>
                  <div className="ws-btn">
                    <button className="ws-swb" onClick={warningSubmitHandler}>
                      Send Warning
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherDashboard;
