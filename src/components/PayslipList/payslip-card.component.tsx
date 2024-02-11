import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Payslip from "../../models/payslip.model";

interface PayslipCardProps {
  payslip: Payslip;
  navigate: (path: string) => void;
}

const PayslipCard: React.FC<PayslipCardProps> = ({ payslip, navigate }) => {
  return (
    <div
      className="payslip-card"
      onClick={() => {
        navigate(`/payslip/${payslip.id}`);
      }}
    >
      <img
        src={payslip.file}
        alt={`Payslip ${payslip.id}`}
        className="payslip-image"
      />
      <span className="payslip-id-badge">
        <span className="badge">{payslip.id}</span>
      </span>
      <div className="payslip-details">
        <div className="date-container">
          <div>
            <span className="date-label">
              <FaCalendarAlt size={32} />
            </span>
          </div>
          <div className="date-value_contianer">
            <span className="small">From Date</span>
            <span className="date-value">{payslip.fromDate}</span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="date-container">
          <div>
            <span className="date-label">
              <FaCalendarAlt size={32} />
            </span>
          </div>
          <div className="date-value_contianer">
            <span className="small">To Date</span>
            <span className="date-value">{payslip.toDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipCard;
