import React from 'react'
import "./Warnings.css"

const WarningCard = ({warning}) => {
  return (
    <div className='wc-mc'>
        <span style={{color:"#9C9C9C"}}>Warning From: {warning.teacher}</span>
        <span style={{color:"#9C9C9C"}}>Reason: {warning.reason}</span>
    </div>
  )
}

export default WarningCard