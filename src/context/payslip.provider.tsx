import React, { createContext, ReactNode, useContext } from "react";
import PayslipRepository from "../repositories/payslip.repository";
import PayslipService from "../services/payslip.service";

interface PayslipContextProps {
  payslipService: PayslipService;
}

const PayslipContext = createContext<PayslipContextProps | undefined>(
  undefined
);

export const PayslipProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const payslipRepository = new PayslipRepository();
  const payslipService = new PayslipService(payslipRepository);

  return (
    <PayslipContext.Provider value={{ payslipService }}>
      {children}
    </PayslipContext.Provider>
  );
};

export const usePayslipContext = () => {
  const context = useContext(PayslipContext);
  if (!context) {
    throw new Error("usePayslipContext must be used within a PayslipProvider");
  }
  return context;
};
