import React from "react";
import { useTrail } from "react-spring";
import { useNavigate } from "react-router-dom";
import "./PayslipList.css";
import { usePayslipContext } from "../../context/payslip.provider";
import PayslipListPresenter from "./payslip-list.presenter";

const PayslipListContainer: React.FC = () => {
  const { payslipService } = usePayslipContext();
  const payslips = payslipService.getAllPayslips();
  const navigate = useNavigate();

  const trail = useTrail(payslips.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
  });

  return <PayslipListPresenter payslips={payslips} trail={trail} navigate={navigate} />;
};

export default PayslipListContainer;