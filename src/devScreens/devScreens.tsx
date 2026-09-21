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
    name: "Scan: minus one heart",
    screen: <ScannerScreen simulatedQrCodeString="-heart" />,
  },
  {
    name: "Scan: plus one smiley",
    screen: <ScannerScreen simulatedQrCodeString="+smiley" />,
  },
  {
    name: "Scan: plus 10 percent",
    screen: <ScannerScreen simulatedQrCodeString="+010pp" />,
  },
  {
    name: "Scan: minus 10 percent",
    screen: <ScannerScreen simulatedQrCodeString="-010pp" />,
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
