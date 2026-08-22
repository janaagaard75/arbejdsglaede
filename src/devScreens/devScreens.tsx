import { ReactNode } from "react";
import { HomeScreen } from "../homeScreen/HomeScreen";
import { ResetScreen } from "../ResetScreen";
import { CameraPermissionRequired } from "../scannerScreen/CameraPermissionRequired";
import { ScannerScreen } from "../scannerScreen/ScannerScreen";
import { WaitingForCameraPermission } from "../scannerScreen/WaitingForCameraPermission";
import { SmileyPreviewScreen } from "./SmileyPreviewScreen";

interface DevScreen {
  name: string;
  screen: ReactNode;
}

export const devScreens: ReadonlyArray<DevScreen> = [
  {
    name: "Home",
    screen: <HomeScreen />,
  },
  {
    name: "Reset",
    screen: <ResetScreen />,
  },
  {
    name: "Scan",
    screen: <ScannerScreen />,
  },
  {
    name: "Scan: unknown code",
    screen: <ScannerScreen simulatedQrCodeString="https://example.com" />,
  },
  {
    name: "Scan: plus one flame",
    screen: <ScannerScreen simulatedQrCodeString="+flame" />,
  },
  {
    name: "Scan: minus one flame",
    screen: <ScannerScreen simulatedQrCodeString="-flame" />,
  },
  {
    name: "Scan: plus one heart",
    screen: <ScannerScreen simulatedQrCodeString="+heart" />,
  },
  {
    name: "Scan: minus one heart",
    screen: <ScannerScreen simulatedQrCodeString="-heart" />,
  },
  {
    name: "Scan: plus 15 percent",
    screen: <ScannerScreen simulatedQrCodeString="+015pp" />,
  },
  {
    name: "Scan: minus 15 percent",
    screen: <ScannerScreen simulatedQrCodeString="-015pp" />,
  },
  {
    name: "Scan: waiting for permission",
    screen: <WaitingForCameraPermission />,
  },
  {
    name: "Scan: permission required",
    screen: (
      <CameraPermissionRequired onRequestCameraPermissions={() => undefined} />
    ),
  },
  {
    name: "Smileys",
    screen: <SmileyPreviewScreen />,
  },
];
