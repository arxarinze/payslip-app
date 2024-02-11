import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { FaArrowLeft, FaCalendar, FaFileInvoice } from "react-icons/fa";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { convertImageToBase64 } from "../../utils/utils";
import { usePayslipContext } from "../../context/payslip.provider";
import { Toast } from "@capacitor/toast";
import "./PayslipDetails.css";
import Payslip from "../../models/payslip.model";

const PayslipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { payslipService } = usePayslipContext();
  const payslip = payslipService.getPayslipById(id!);

  const isMobilePlatform = Capacitor.isNativePlatform();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const downloadPayslip = async () => {
    if (!payslip || !payslip.file || loading) {
      return;
    }

    try {
      setLoading(true);

      if (isMobilePlatform) {
        await downloadMobilePayslip(payslip);
      } else {
        downloadWebPayslip(payslip);
      }
    } catch (error) {
      console.error("Error handling payslip download:", error);
      Toast.show({
        text: "Error downloading payslip. Please try again.",
        duration: "short",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadMobilePayslip = async (payslip: Payslip) => {
    try {
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
    } catch (error) {
      console.error("Error downloading mobile payslip:", error);
      Toast.show({
        text: "Error downloading payslip. Please try again.",
        duration: "short",
      });
    }
  };

  const downloadWebPayslip = (payslip: Payslip) => {
    try {
      window.open(payslip.file, "_blank");
    } catch (error) {
      console.error("Error opening file:", error);
      Capacitor.Plugins.Toast.show({
        text: "Error opening payslip. Please try again.",
        duration: "short",
      });
    }
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
          {renderDetails("ID", payslip.id, <FaFileInvoice size={32} />)}
          {renderDetails(
            "From Date",
            payslip.fromDate,
            <FaCalendar size={32} />
          )}
          {renderDetails("To Date", payslip.toDate, <FaCalendar size={32} />)}
        </div>
        <div className="download-button_container">
          <button onClick={downloadPayslip} className="download-button">
            {loading ? "Downloading..." : "Download Payslip"}
          </button>
        </div>
      </div>
    </animated.div>
  ) : (
    <animated.div style={props}>Payslip not found</animated.div>
  );
};

const renderDetails = (label: string, value: string, icon: JSX.Element) => (
  <div className="flex-box items-center">
    <div className="w-30 flex-box justify-start gap-7 items-center">
      {icon} {label}
    </div>
    <div className="w-50 flex-box justify-start">{value}</div>
  </div>
);

export default PayslipDetails;
