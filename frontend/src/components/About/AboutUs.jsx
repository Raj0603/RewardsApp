import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import Navbar from "../Home/Navbar";
import about from "../../assets/about.svg";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const [home, setHome] = useState(""); // Initialize state for home

  const { isAuthenticated: studentAuthenticated } = useSelector(
    (state) => state.student
  );
  const { isAuthenticated: teacherAuthenticated } = useSelector(
    (state) => state.teacher
  );

  useEffect(() => {
    // Set home based on authentication status
    if (teacherAuthenticated) {
      setHome("tdashboard");
    } else if (studentAuthenticated) {
      setHome("sdashboard");
    }
  }, [teacherAuthenticated, studentAuthenticated]);

  return (
    <div className="home-mc">
      <Navbar home={home} />
      <div className="home-dc">
        <div className="dc-right">
          <img src={about} alt="" className="home-img" />
        </div>
        <div className="dc-left">
          <div className="left-box1">
            <span className="text-box">About</span> Us
          </div>
          <div className="dc-box2">
            E-Coins for College is a system and an initiative that aims to
            evolve the recognition and rewards in the current educational
            scenario.
          </div>
          <div className="dc-box2">
            Through the use of virtual coins, students are motivated to perform
            better and become high achievers.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
