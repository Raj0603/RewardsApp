import React from 'react'
import "./Loading.css"
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div class="scene">
  <div class="shadow"></div>
  <div class="jumper">
    <div class="spinner">
      <div class="scaler">
        <div class="loader">
          <div class="cuboid">
            <div class="cuboid__side"></div>
            <div class="cuboid__side"></div>
            <div class="cuboid__side"></div>
            <div class="cuboid__side"></div>
            <div class="cuboid__side"></div>
            <div class="cuboid__side"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
  )
}

export default Loading