import { BarcodeBounds, BarcodeScanningResult, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { View } from "react-native";
import { useColors } from "../colors/useColors";
import { HeadUpDisplay } from "./HeadUpDisplay";
import { QrCodeHighlighter } from "./QrCodeHighlighter";

interface Props {
  readonly onScannedQrCodeChange: (scannedQrCode: string | undefined) => void;
  readonly scannedQrCode: string | undefined;
}

interface Challenger {
  bounds: BarcodeBounds;
  data: string;
  firstSeenAt: number;
  lastSeenAt: number;
}

export const Viewfinder = (props: Props) => {
  const [bounds, setBounds] = useState<BarcodeBounds | undefined>(undefined);
  const challenger = useRef<Challenger | undefined>(undefined);
  const colors = useColors();
  const scannedQrCodeLastSeenAt = useRef(0);

  const [resetScannedQrCodeTimeoutId, setResetScannedQrCodeTimeoutId] =
    useState<ReturnType<typeof setTimeout> | undefined>(undefined);

  const debounceDuration = 400;
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

    const now = Date.now();

    if (
      props.scannedQrCode === undefined
      || scanningResult.data === props.scannedQrCode
    ) {
      scannedQrCodeLastSeenAt.current = now;
      challenger.current = undefined;

      if (scanningResult.data !== props.scannedQrCode) {
        props.onScannedQrCodeChange(scanningResult.data);
      }

      updateBounds(scanningResult.bounds);
    } else {
      const updatedChallenger = updateChallenger(scanningResult, now);

      const scannedQrCodeKeepsItsLock =
        now - scannedQrCodeLastSeenAt.current <= debounceDuration;
      const challengerHasBeenInSightLongEnough =
        now - updatedChallenger.firstSeenAt >= debounceDuration;

      if (!scannedQrCodeKeepsItsLock && challengerHasBeenInSightLongEnough) {
        scannedQrCodeLastSeenAt.current = now;
        props.onScannedQrCodeChange(updatedChallenger.data);
        updateBounds(updatedChallenger.bounds);
        challenger.current = undefined;
      }
    }

    setResetScannedQrCodeTimeoutId(setTimeout(resetScannedQrCode, 3_000));
  };

  const updateChallenger = (
    scanningResult: BarcodeScanningResult,
    now: number,
  ): Challenger => {
    const previous = challenger.current;
    const firstSeenAt =
      previous !== undefined
      && previous.data === scanningResult.data
      && now - previous.lastSeenAt <= debounceDuration
        ? previous.firstSeenAt
        : now;

    challenger.current = {
      bounds: scanningResult.bounds,
      data: scanningResult.data,
      firstSeenAt: firstSeenAt,
      lastSeenAt: now,
    };

    return challenger.current;
  };

  const updateBounds = (newBounds: BarcodeBounds) => {
    if (
      bounds === undefined
      || bounds.origin.x !== newBounds.origin.x
      || bounds.origin.y !== newBounds.origin.y
      || bounds.size.height !== newBounds.size.height
      || bounds.size.width !== newBounds.size.width
    ) {
      setBounds(newBounds);
    }
  };

  const resetScannedQrCode = () => {
    challenger.current = undefined;
    scannedQrCodeLastSeenAt.current = 0;
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
