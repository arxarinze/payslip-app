import React from "react";
import { SpringValue, animated } from "react-spring";
import PayslipCard from "./payslip-card.component";
import Payslip from "../../models/payslip.model";

interface PayslipListPresenterProps {
  payslips: Payslip[];
  trail: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  }[];
  navigate: (path: string) => void;
}

const PayslipListPresenter: React.FC<PayslipListPresenterProps> = ({
  payslips,
  trail,
  navigate,
}) => {
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

export default PayslipListPresenter;
