import { BarcodeBounds, BarcodeScanningResult, CameraView } from "expo-camera";
import { useState } from "react";
import { View } from "react-native";
import { useColors } from "../colors/useColors";
import { HeadUpDisplay } from "./HeadUpDisplay";
import { QrCodeHighlighter } from "./QrCodeHighlighter";

interface Props {
  readonly onScannedQrCodeChange: (scannedQrCode: string | undefined) => void;
  readonly scannedQrCode: string | undefined;
}

export const Viewfinder = (props: Props) => {
  const [bounds, setBounds] = useState<BarcodeBounds | undefined>(undefined);
  const colors = useColors();

  const [resetScannedQrCodeTimeoutId, setResetScannedQrCodeTimeoutId] =
    useState<ReturnType<typeof setTimeout> | undefined>(undefined);

  const scannerMargin = 50;
  const viewfinderSize = 90 * 3;

  const qrCodeScanned = (scanningResult: BarcodeScanningResult) => {
    if (resetScannedQrCodeTimeoutId !== undefined) {
      clearTimeout(resetScannedQrCodeTimeoutId);
    }

    // Verify that the scanned QR code is entirely within the visible area of the viewfinder.
    const aboveScanningArea = scanningResult.bounds.origin.y < scannerMargin;
    const belowScanningArea =
      scanningResult.bounds.origin.y + scanningResult.bounds.size.height
      > viewfinderSize - scannerMargin;
    const leftOfScanningArea = scanningResult.bounds.origin.x < scannerMargin;
    const rightOfScanningArea =
      scanningResult.bounds.origin.x + scanningResult.bounds.size.width
      > viewfinderSize - scannerMargin;

    if (
      aboveScanningArea
      || belowScanningArea
      || leftOfScanningArea
      || rightOfScanningArea
    ) {
      return;
    }

    if (scanningResult.data !== props.scannedQrCode) {
      props.onScannedQrCodeChange(scanningResult.data);
    }

    if (
      bounds === undefined
      || bounds.origin.x !== scanningResult.bounds.origin.x
      || bounds.origin.y !== scanningResult.bounds.origin.y
      || bounds.size.height !== scanningResult.bounds.size.height
      || bounds.size.width !== scanningResult.bounds.size.width
    ) {
      setBounds(scanningResult.bounds);
    }

    setResetScannedQrCodeTimeoutId(setTimeout(resetScannedQrCode, 3_000));
  };

  const resetScannedQrCode = () => {
    props.onScannedQrCodeChange(undefined);
    setBounds(undefined);
  };

  return (
    <View
      className="mx-auto"
      style={{
        height: viewfinderSize,
        width: viewfinderSize,
      }}
    >
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        facing="back"
        onBarcodeScanned={qrCodeScanned}
        style={{
          backgroundColor: colors.disabledText,
          height: "100%",
          width: "100%",
        }}
      />
      <HeadUpDisplay viewfinderSize={viewfinderSize} />
      <QrCodeHighlighter bounds={bounds} />
    </View>
  );
};
