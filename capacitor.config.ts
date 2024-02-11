import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.payslip.deel",
  appName: "deel-payslip-app",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
  ios: {
    contentInset: "always",
    handleApplicationNotifications: true,
  },
};

export default config;
