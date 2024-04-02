import React, { useEffect, useState } from "react";
import "./Wallet.css";
import Navbar from "../../Home/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import studentLogo from "../../../assets/profile.svg";
import { logoutStudent } from "../../../actions/studentAction";
import WalletImg from "../../../assets/wallet.svg";
import { studentForm } from "../../../actions/formAction";
import Web3 from "web3";
import { getBalance } from "../../../actions/walletAction";
import {
  studentTransactions,
  getTransaction,
} from "../../../actions/transactionAction";
import CTransactionCard from "./CTransactionCard";
import DTransactionCard from "./DTransactionCard";

const Wallet = () => {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, student, isAuthenticated } = useSelector(
    (state) => state.student
  );
  const { fetching, studentBalance } = useSelector(
    (state) => state.studentBalance
  );

  const { processing, success, creditTransactions, debitTransactions } =
    useSelector((state) => state.transactionDetails);

  const [toggleOption, setToggleOption] = useState("friend");

  const FromStudent = async () => {
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
        // receiver wallet id, amount
        .fromStudent(receiverId, amount)
        .send({ from: accounts[0] });

      const sdata = {
        amount: amount,
        walletId: receiverId,
      };

      dispatch(studentTransactions(sdata));

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = (option) => {
    setToggleOption(option);
  };

  const handleServiceSelect = (event) => {
    const selectedService = event.target.value;
    if (selectedService === "canteen") {
      setReceiverId("0x0b32322153A2546a831399d297b68503F1A27C4e");
    }
    if (selectedService === "library") {
      setReceiverId("0x453B9947d152812f04245AE1310BD537d37285d3");
    }
    if (selectedService === "stationary") {
      setReceiverId("0xadeB38326C5eD59bBcBF703bC8C8687b1b593Bc7");
    }
  };

  const { forms, error } = useSelector((state) => state.allForm);

  const approvedForms = forms?.filter((form) => form.status === "Approved");

  useEffect(() => {
    if (loading === false) {
      if (!isAuthenticated) {
        navigate("/studentlogin");
      }

      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if (!fetching) {
        dispatch(getBalance(student.walletId));
      }

      dispatch(getTransaction());

      dispatch(studentForm());
    }
  }, [loading, navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="user-mc">
         
          {student.role === "student" ? (
            <>
             <Navbar
            isAuthenticated={isAuthenticated}
            logout={logoutStudent}
            address="studentlogin"
            home="sdashboard"
          />
            <div className="sd-mc">
              <div className="wallet-lc">
                <div className="sd-rd">
                  <span className="text-box">Student</span> Dashboard
                </div>
                <span className="line-span"></span>
                <div className="sd-studentdetails">
                  <div className="sd-sdl">
                    <img src={studentLogo} alt="" className="profile-img" />
                  </div>
                  <div className="sd-sdr">
                    <span className="details-span">{student?.name}</span>
                    <span className="details-span">
                      Total Achievements: {approvedForms?.length}
                    </span>
                    <span className="details-span">
                      Total Coins: {studentBalance}
                    </span>
                  </div>
                </div>
                <span className="line-span"></span>
                <div className="wallet-info">
                  <img src={WalletImg} alt="" className="wallet-img" />
                  <div className="wallet-id-info">
                    <span>Wallet Id: </span>
                    <span>{student.walletId}</span>
                  </div>
                  <Link to="/sdashboard">
                    <h3>{"<"} Back to Dashboard</h3>
                  </Link>
                </div>
              </div>
              <div className="wallet-rc">
                <div className="wallet-transaction">
                  <div className="dropdown">
                    <select id="transaction-type">
                      <option value="all" selected>
                        All Transactions{" "}
                      </option>
                      <option value="sent">Sent Coins </option>
                      <option value="received">Received Coins </option>
                    </select>
                  </div>

                  <div className="transaction-history">
                    {creditTransactions?.length > 0 ? (
                      <>
                        {creditTransactions.map((creditTransaction) => (
                          <CTransactionCard
                            key={creditTransaction._id}
                            data={creditTransaction}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                    {debitTransactions?.length > 0 ? (
                      <>
                        {debitTransactions.map((debitTransaction) => (
                          <DTransactionCard
                            key={debitTransaction._id}
                            data={debitTransaction}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="wallet-payment">
                  <div className="wallet-balance">
                    <span
                      style={{
                        color: "#737373",
                        fontWeight: "600",
                        fontSize: "36px",
                      }}
                    >
                      Current Balance:
                    </span>

                    {fetching ? (
                      <></>
                    ) : (
                      <span
                        style={{
                          color: "#383838",
                          fontWeight: "700",
                          fontSize: "70px",
                        }}
                      >
                        {studentBalance}
                      </span>
                    )}
                  </div>
                  <div className="wallet-payservice">
                    <div className="toggle-container">
                      <div className="toggle-buttons">
                        <button
                          onClick={() => handleToggle("friend")}
                          className={`${toggleOption === "friend" && "active"}`}
                          style={{
                            borderTopLeftRadius: "40px",
                            cursor: "pointer",
                            borderLeft:
                              toggleOption === "friend" && "active"
                                ? "2px solid #383838"
                                : "none",
                          }}
                        >
                          pay a friend
                        </button>
                        <button
                          onClick={() => handleToggle("service")}
                          className={`${
                            toggleOption === "service" && "active"
                          }`}
                          style={{
                            borderTopRightRadius: "40px",
                            cursor: "pointer",
                            borderRight:
                              toggleOption === "service" && "active"
                                ? "2px solid #383838"
                                : "none",
                          }}
                        >
                          pay a service
                        </button>
                      </div>
                      <div
                        className={`toggle-option ${
                          toggleOption === "friend" && "active"
                        }`}
                      >
                        <h4>friend details:</h4>
                        <input
                          type="text"
                          placeholder="Friends wallet id"
                          className="transaction-input"
                          required
                          name="FriendId"
                          value={receiverId}
                          onChange={(e) => setReceiverId(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Enter amount"
                          className="transaction-input"
                          required
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <button className="submit-btn" onClick={FromStudent}>
                          send coins
                        </button>
                      </div>
                      <div
                        className={`toggle-option ${
                          toggleOption === "service" && "active"
                        }`}
                      >
                        <h4>Select Service:</h4>
                        <div className="dropdown">
                          <select
                            id="serviceSelect"
                            onChange={handleServiceSelect}
                          >
                            <option value="select" selected>
                              Select Service
                            </option>
                            <option value="canteen">Canteen</option>
                            <option value="stationary">Stationary</option>
                            <option value="library">Library</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter amount"
                          className="transaction-input"
                          required
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <button className="submit-btn" onClick={FromStudent}>
                          send coins
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>
          ) : (
            <>
             <Navbar
            isAuthenticated={isAuthenticated}
            logout={logoutStudent}
            address="studentlogin"
            home="sdashboard"
            role="service"
          />
            <div className="sd-mc">
              <div className="wallet-lc">
                <div className="sd-rd">
                  <span className="text-box">{student.name}</span> Dashboard
                </div>
                <span className="line-span"></span>
                <div className="wallet-info" style={{justifyContent:"center"}}>
                  <img src={WalletImg} alt="" className="wallet-img" />
                  <div className="wallet-id-info">
                    <span>Wallet Id: </span>
                    <span>{student.walletId}</span>
                  </div>
                </div>
               
                <span className="line-span"></span>
                <div className="wallet-balance" style={{width:"16vw", height:"13vh"}}>
                    <span
                      style={{
                        color: "#737373",
                        fontWeight: "600",
                        fontSize: "24px",
                      }}
                    >
                      Current Balance:
                    </span>

                    {fetching ? (
                      <></>
                    ) : (
                      <span
                        style={{
                          color: "#383838",
                          fontWeight: "700",
                          fontSize: "55px",
                        }}
                      >
                        {studentBalance}
                      </span>
                    )}
                  </div>
              </div>
              <div className="wallet-rc">
                <div className="wallet-transaction" style={{width:"63vw", marginLeft:"30px"}}>
                  <div className="dropdown">
                    <select id="transaction-type">
                      <option value="all" selected>
                        All Transactions{" "}
                      </option>
                      <option value="sent">Sent Coins </option>
                      <option value="received">Received Coins </option>
                    </select>
                  </div>

                  <div className="transaction-history">
                    {creditTransactions?.length > 0 ? (
                      <>
                        {creditTransactions.map((creditTransaction) => (
                          <CTransactionCard
                            key={creditTransaction._id}
                            data={creditTransaction}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                    {debitTransactions?.length > 0 ? (
                      <>
                        {debitTransactions.map((debitTransaction) => (
                          <DTransactionCard
                            key={debitTransaction._id}
                            data={debitTransaction}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
               
              </div>
            </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Wallet;
