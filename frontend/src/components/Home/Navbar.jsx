import React from "react";
import "./Home.css";
import logo from "../../assets/logo2.svg";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, Link } from "react-router-dom";
import WalletIcon from "../../assets/walletIcon.svg";
import WarnIcon from "../../assets/Frame.svg";

const Navbar = ({ isAuthenticated, logout, address, home, role }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const submitLogoutHandler = () => {
    dispatch(logout());
    alert.success("Logout Successful");
    navigate(`/${address}`);
  };

  let navWidth;
  let navMargin;

  if (isAuthenticated) {
    navWidth = "45vw";
    navMargin = "27.5vw";
  } else {
    navWidth = "35vw";
  }

  const navigateWallet = () => {
    navigate("/wallet");
  };
  const navigateWarnings = () => {
    navigate("/warnings");
  };
  return (
    <nav
      className="home-nav"
      style={{ width: navWidth, marginLeft: navMargin }}
    >
      <span>
        <img src={logo} alt="" className="nav-logo" />{" "}
      </span>
      <span>|</span>
      {home ? (
        <Link to={`/${home}`}>
          <span className="nav-section">Home</span>
        </Link>
      ) : (
        <Link to="/">
          <span className="nav-section">Home</span>
        </Link>
      )}

      <span>|</span>
      <Link to="/about">
        <span className="nav-section">About</span>
      </Link>
      <span>|</span>
      <span className="nav-section">Contact</span>
      {isAuthenticated ? (
        <>
          <span>|</span>
          <span className="nav-section" onClick={submitLogoutHandler}>
            Logout
          </span>
          {address === "studentlogin" && role !== "service"? (
            <>
              <span
                className="nav-wallet"
                onClick={navigateWallet}
                style={{ left: "63vw" }}
              >
                <img src={WalletIcon} alt="" style={{ height: "5vh" }} />
              </span>
              <span
                className="nav-wallet"
                onClick={navigateWarnings}
                style={{ right: "65vw", border: "2px solid #F2635F" }}
              >
                <img src={WarnIcon} alt="" style={{ height: "5vh" }} />
              </span>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
