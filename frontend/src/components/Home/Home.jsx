import React from "react";
import "./Home.css";
import Navbar from "./Navbar";
import coins from "../../assets/coinss.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-mc">
      <Navbar />

      <div className="home-dc">
        <div className="dc-left">
          <div className="left-box1">
            <span className="text-box">E-Coins</span> For College
          </div>
          <div className="left-box2">
            A platform designed to recognize your hard work and dedication,
            helping you pave the way to a brighter future.
          </div>
          <div className="left-box3">
            Join us today and start earning coins for your academic milestones
          </div>
          <div className="left-box4">
            <Link to="/register">
            <button className="home-rnb">Register Now</button>{" "}

            </Link>
            <Link to="/login">
            <button className="home-lib">Log in</button>
            </Link>
          </div>
        </div>
        <div className="dc-right">
          <img src={coins} alt="" className="home-img" />
        </div>
      </div>
    </div>
  );
};

export default Home;
