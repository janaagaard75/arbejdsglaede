import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainStore } from "../mainState/mainStore";
import { SlideToConfirm } from "../slideToConfirm/SlideToConfirm";
import { ThemedView } from "../themed/ThemedView";
import { useColors } from "../themed/useColors";
import { CameraPermissionRequired } from "./CameraPermissionRequired";
import { parseQrCodeString } from "./parseQrCodeString";
import { ScannedCodeFeedback } from "./ScannedCodeFeedback";
import { Viewfinder } from "./Viewfinder";
import { WaitingForCameraPermission } from "./WaitingForCameraPermission";

export const ScannerScreen = observer(() => {
  const { t } = useTranslation();
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [qrCodeString, setQrCodeString] = useState<string | undefined>(
    undefined,
  );
  const colors = useColors();
  const router = useRouter();

  const parsedQrCode = parseQrCodeString(qrCodeString);
  const qrCode = parsedQrCode === "unknownQrCode" ? undefined : parsedQrCode;

  const applyQrCode = () => {
    if (qrCode === undefined) {
      return;
    }

    mainStore.applyQrCode(qrCode);

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
            scannedQrCode={qrCodeString}
          />
        </View>
        <View className="flex-1">
          <ScannedCodeFeedback
            flames={mainStore.flames}
            hearts={mainStore.hearts}
            percentage={mainStore.percentage}
            qrCode={parsedQrCode}
          />
        </View>
        <View className="mx-auto mb-20 justify-end">
          <SlideToConfirm
            buttonWidth={140}
            disabled={qrCode === undefined}
            onConfirm={applyQrCode}
            sliderWidth={250}
          >
            {t("confirm")}
          </SlideToConfirm>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
});
