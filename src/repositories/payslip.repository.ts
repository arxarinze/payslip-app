import { payslips } from "../database/data";
import Payslip from "../models/payslip.model";

class PayslipRepository {
  getAll(): Payslip[] {
    return payslips;
  }

  getById(id: string): Payslip | undefined {
    return payslips.find((p) => p.id === id);
  }
}

export default PayslipRepository;
