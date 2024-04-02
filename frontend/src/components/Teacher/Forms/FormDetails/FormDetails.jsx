import React, { useEffect, useState } from "react";
import "./FormDetails.css";
import Navbar from "../../../Home/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { increaseRewards, logoutTeacher } from "../../../../actions/teacherAction";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  getFormDetails,
  updateForm,
  clearErrors,
} from "../../../../actions/formAction";
import { teacherTransactions } from "../../../../actions/transactionAction";
import { TEACHER_FORM_UPDATE_RESET } from "../../../../constants/formConstant";
import Loading from "../../../Loading/Loading";
import ConfirmationDialog from "./ConfirmationDialog";
import Web3 from "web3";

const TFormDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  const alert = useAlert();

  const [confirmationDialog, setConfirmationDialog] = useState(null);

  const [amount, setAmount] = useState();
  

  useEffect(() => {
    dispatch(getFormDetails(id));
  }, [dispatch, id]);

  const { loading, form } = useSelector((state) => state.formDetails);

  const { isAuthenticated } = useSelector((state) => state.teacher);

  const { error, isUpdated } = useSelector((state) => state.updateForm);

  const submittedAt = new Date(form.submittedAt);
  const day = submittedAt.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = submittedAt.getMonth();
  const year = submittedAt.getFullYear();
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  useEffect(() => {
    if (!loading) {
      const coins = calculateCoins(form?.category);
      setAmount(coins); 
    }
  }, [form, loading]);

  const calculateCoins = (category) => {
    switch (category) {
      case "Research Paper Published in Reputed Journal or Conference":
        return 500;
      case "Securing Job Offer through Campus Placements":
        return 400;
      case "Securing Job Offer Off-Campus":
        return 350;
      case "Coding Competition Winner":
      case "Hackathon Winner":
      case "Robotics Competition Winner":
      case "Aerospace Engineering Competition Winner":
      case "Engineering Design Challenge Winner":
      case "Competition":
        return 300;
      case "Exhibitor at Science and Engineering Fair":
      case "Math Olympiad Winner/Runner Up":
      case "Science Olympiad Winner/Runner Up":
      case "Startup Initiative Competitions Winner/Runner Up":
      case "Business Plan Competitions":
        return 200;
      case "Highest GPA in Class for a Given Semester":
      case "Environmental Conservation Project Development":
      case "Problem-Solving Competition Winner":
      case "Interdisciplinary Research":
      case "Design Challenges":
        return 150;
      case "Language Proficiency Challenges":
      case "Sports Competition":
      case "Fitness Competition":
      case "Cultural Festival Competition":
      case "Performing Arts Competition":
      case "Visual Arts Competition":
      case "Creative Writing Competition":
      case "Speech & Debate Competitions":
      case "Literary Magazine Publication":
      case "Spelling Bee":
        return 100;
      case "Volunteer Work":
      case "Social Impact Initiative":
      case "Fundraising Initiative":
      case "Entrepreneurial Endeavour":
      case "Community Organizing":
      case "External Course Completion":
      case "Early Submission of Assignments":
      case "100% Attendance":
      case "Perfect Score in Internal Assessment":
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
        .fromTeacher(form.walletId, amount)
        .send({ from: accounts[0] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectSubmit = () => {
    setConfirmationDialog({
      message: "Are you sure you want to reject this form?",
      onConfirm: () => {
        const status = "Rejected";
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateForm(id, myForm));
        setConfirmationDialog(null);
      },
      onCancel: () => setConfirmationDialog(null),
    });
  };

  const approveFunction = () => {
 
    const tdata = {
      receiverName: form.studentName,
      amount: amount,
      receiverId: form.student,
    };

    dispatch(teacherTransactions(tdata));

    // Update the form status to "Approved"
    const status = "Approved";
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateForm(id, myForm));

  };

  const handleApproveSubmit = async () => {
    // Call the FromTeacher function to handle the blockchain transaction
    await FromTeacher();

    const amountData = new FormData();
    amountData.set("amount", amount);
    dispatch(increaseRewards(amountData));

    approveFunction();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Form Updated Successfully");
      dispatch({ type: TEACHER_FORM_UPDATE_RESET });
      // navigate("/tdashboard");
    }
    
  }, [dispatch, alert, error, id, isUpdated, navigate]);

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

          <div className="tfd-mc">
            <div className="tfd-ud">
              <Link to="/tdashboard">{"< "}</Link>
              <span className="text-box">Verify</span> Achievement
            </div>
            <div className="tfd-ld">
              <div className="ld-lc">
                {form.proof ? (
                  <>
                    <img src={form.proof[0].url} alt="" className="tfd-img" />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="ld-rc">
                <div className="tfd-fd">
                  <h2>{form.achievementName}</h2>
                  <span className="tfd-data">{formattedDate}</span>
                  <span className="tfd-data">{form.studentName}</span>
                  <span className="tfd-data">{form.studentClass}</span>
                  <p className="tfd-desc">{form.description}</p>
                </div>
                {form.status === "Pending" ? (
                  <div className="tfd-btn">
                    <button className="tfd-rbtn" onClick={handleRejectSubmit}>
                      reject
                    </button>
                    <button className="tfd-abtn" onClick={handleApproveSubmit}>
                      approve
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {confirmationDialog && (
              <ConfirmationDialog
                message={confirmationDialog.message}
                onCancel={confirmationDialog.onCancel}
                onConfirm={confirmationDialog.onConfirm}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TFormDetails;
