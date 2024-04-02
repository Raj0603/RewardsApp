import React from "react";
import Navbar from "./Navbar";
import "./Home.css";
import coins from "../../assets/coinss.svg";
import { Link } from "react-router-dom";

const LoginAs = () => {
  return (
    <div className="home-mc">
      <Navbar />
      <div className="ra-mc">
        <div className="ra-box1">
          <img src={coins} alt="" className="ra-img" />
        </div>
        <div className="ra-box2">
          <span className="text-box">E-Coins</span> For College
        </div>
        <div className="ra-box3">Login to your ECOINS</div>
        <div className="ra-box4">
          <Link to="/tlogin">
            <button className="ra-rnb">Login as teacher</button>
          </Link>

          <Link to="/studentlogin">
            <button className="ra-rnb">Login as student</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginAs;
