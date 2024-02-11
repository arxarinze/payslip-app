import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { FaArrowLeft, FaFileInvoice } from "react-icons/fa";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { convertImageToBase64 } from "../../utils/utils";
import { usePayslipContext } from "../../context/payslip.provider";
import "./PayslipDetails.css";
import Payslip from "../../models/payslip.model";

const PayslipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { payslipService } = usePayslipContext();
  const payslip = payslipService.getPayslipById(id!);

  const isMobilePlatform = Capacitor.isNativePlatform();
  const navigate = useNavigate();

  const downloadPayslip = async () => {
    if (!payslip || !payslip.file) {
      return;
    }

    try {
      if (isMobilePlatform) {
        await downloadMobilePayslip(payslip);
      } else {
        downloadWebPayslip(payslip);
      }
    } catch (error) {
      console.error("Error handling payslip download:", error);
    }
  };

  const downloadMobilePayslip = async (payslip: Payslip) => {
    const base64 = await convertImageToBase64(`/${payslip.file}`);
    await Filesystem.writeFile({
      path: payslip.file,
      data: base64 as string,
      directory: Directory.Documents,
      recursive: true,
    });
    const { uri } = await Filesystem.getUri({
      directory: Directory.Documents,
      path: payslip.file,
    });

    await Share.share({
      title: "Download Payslip",
      url: uri,
      dialogTitle: "Download Payslip",
    });
  };

  const downloadWebPayslip = (payslip: Payslip) => {
    window.open(payslip.file, "_blank");
  };

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    if (!payslip) {
      navigate("/");
    }
  }, [payslip, navigate]);

  const navigateBack = () => {
    navigate("/");
  };

  return payslip ? (
    <animated.div style={props} className="paydetail-container">
      <div>
        <button className="back-button" onClick={navigateBack}>
          <FaArrowLeft color="white" /> Back
        </button>
        <h1>Payslip Details</h1>
        <div className="details-section">
          {renderDetails("ID", payslip.id)}
          {renderDetails("From Date", payslip.fromDate)}
          {renderDetails("To Date", payslip.toDate)}
        </div>
        <button onClick={downloadPayslip} className="download-button">
          Download Payslip
        </button>
      </div>
    </animated.div>
  ) : (
    <animated.div style={props}>Payslip not found</animated.div>
  );
};

const renderDetails = (label: string, value: string) => (
  <div className="flex-box items-center">
    <div className="w-50 flex-box justify-start gap-7 items-center">
      <FaFileInvoice size={32} /> {label}
    </div>
    <div className="w-50 flex-box justify-start">{value}</div>
  </div>
);

export default PayslipDetails;
