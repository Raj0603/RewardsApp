import React from "react";
import Navbar from "./Navbar";
import "./Home.css";
import coins from "../../assets/coinss.svg";
import { Link } from "react-router-dom";

const RegisterAs = () => {
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
        <div className="ra-box3">Register Now to Get Started</div>
        <div className="ra-box4">
          <Link to="/tregistration">
            <button className="ra-rnb">I am a Teacher</button>
          </Link>

          <Link to="/studentregistration">
            <button className="ra-rnb">I am a student</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterAs;
