import React from "react";
import { animated, useTrail } from "react-spring";
import { useNavigate } from "react-router-dom";
import "./PayslipList.css";
import PayslipCard from "./payslip-card.component";
import { usePayslipContext } from "../../context/payslip.provider";

const PayslipList: React.FC = () => {
  const { payslipService } = usePayslipContext();
  const payslips = payslipService.getAllPayslips();
  const navigate = useNavigate();

  const trail = useTrail(payslips.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
  });

  return (
    <div className="payslip-container">
      <h1>Payslips</h1>
      <ul className="payslip-list">
        {trail.map((style, index) => (
          <animated.li key={payslips[index].id} style={style}>
            <PayslipCard payslip={payslips[index]} navigate={navigate} />
          </animated.li>
        ))}
      </ul>
    </div>
  );
};

export default PayslipList;
