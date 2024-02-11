import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { PayslipProvider } from "./context/payslip.provider";
import PayslipList from "./components/PayslipList/payslip-list.component";
import PayslipDetails from "./components/PayslipDetails/payslip-detail.component";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <PayslipProvider>
          <Routes>
            <Route path="/" element={<PayslipList />} />
            <Route path="/payslip/:id" element={<PayslipDetails />} />
            <Route path="*" element={<div>There's nothing here!</div>} />
          </Routes>
        </PayslipProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
