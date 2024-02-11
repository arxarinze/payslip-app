import Payslip from "../models/payslip.model";
import PayslipRepository from "../repositories/payslip.repository";

class PayslipService {
  private repository: PayslipRepository;

  constructor(repository: PayslipRepository) {
    this.repository = repository;
  }

  getAllPayslips(): Payslip[] {
    return this.repository.getAll();
  }

  getPayslipById(id: string): Payslip | undefined {
    return this.repository.getById(id);
  }
}

export default PayslipService;
