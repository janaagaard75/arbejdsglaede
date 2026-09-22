import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KnownQrCode } from "../mainState/KnownQrCode";
import { mainStore } from "../mainState/mainStore";
import { SlideToConfirm } from "../slideToConfirm/SlideToConfirm";
import { ThemedView } from "../themed/ThemedView";
import { useColors } from "../themed/useColors";
import { CameraPermissionRequired } from "./CameraPermissionRequired";
import { parseQrCodeString } from "./parseQrCodeString";
import { ScannedCodeFeedback } from "./ScannedCodeFeedback";
import { Viewfinder } from "./Viewfinder";
import { WaitingForCameraPermission } from "./WaitingForCameraPermission";

interface Props {
  // Only set by the dev screens, where the code cannot be scanned, because a simulator has no camera.
  readonly simulatedQrCodeString?: string;
}

export const ScannerScreen = observer((props: Props) => {
  const { t } = useTranslation();
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [confirmationInProgress, setConfirmationInProgress] = useState(false);
  const confirmedRef = useRef(false);
  const confirmingQrCodeRef = useRef<KnownQrCode | undefined>(undefined);
  const [qrCodeString, setQrCodeString] = useState(props.simulatedQrCodeString);
  const colors = useColors();
  const router = useRouter();

  const parsedQrCode =
    qrCodeString === undefined ? undefined : parseQrCodeString(qrCodeString);
  const qrCode = parsedQrCode === "unknownQrCode" ? undefined : parsedQrCode;

  const beginConfirmation = () => {
    if (qrCode === undefined || confirmedRef.current) {
      return;
    }

    confirmingQrCodeRef.current = qrCode;
    setConfirmationInProgress(true);
  };

  const cancelConfirmation = () => {
    confirmingQrCodeRef.current = undefined;
    setConfirmationInProgress(false);
  };

  const applyQrCode = () => {
    const confirmingQrCode = confirmingQrCodeRef.current;

    if (confirmingQrCode === undefined || confirmedRef.current) {
      return;
    }

    confirmedRef.current = true;
    mainStore.applyQrCode(confirmingQrCode);

    // Wrapping in this conditional removes a warning from the router. Don't know why.
    if (router.canGoBack()) {
      router.back();
    }
  };

  if (cameraPermissions === null) {
    return <WaitingForCameraPermission />;
  }

  if (!cameraPermissions.granted) {
    return (
      <CameraPermissionRequired
        onRequestCameraPermissions={requestCameraPermissions}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <ThemedView className="flex-1 gap-5">
        <View className="mt-17.5 h-55 justify-end">
          <Viewfinder
            onScannedQrCodeChange={setQrCodeString}
            paused={confirmationInProgress}
            scannedQrCode={qrCodeString}
          />
        </View>
        <View className="flex-1">
          <ScannedCodeFeedback qrCode={parsedQrCode} />
        </View>
        <View className="mx-auto mb-20 justify-end">
          <SlideToConfirm
            buttonWidth={140}
            disabled={qrCode === undefined || confirmedRef.current}
            onConfirm={applyQrCode}
            onInteractionCancel={cancelConfirmation}
            onInteractionStart={beginConfirmation}
            sliderWidth={250}
          >
            {t("confirm")}
          </SlideToConfirm>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
});
