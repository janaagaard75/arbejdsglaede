import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "../colors/useColors";
import { mainStore } from "../mainState/mainStore";
import { SlideToConfirm } from "../slideToConfirm/SlideToConfirm";
import { ThemedText } from "../themed/ThemedText";
import { ThemedTextButton } from "../themed/ThemedTextButton";
import { ThemedView } from "../themed/ThemedView";
import { parseQrCodeString } from "./parseQrCodeString";
import { ScannedCodeFeedback } from "./ScannedCodeFeedback";
import { Viewfinder } from "./Viewfinder";

export const ScannerScreen = observer(() => {
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [qrCodeString, setQrCodeString] = useState<string | undefined>(
    undefined,
  );
  const colors = useColors();
  const router = useRouter();

  const qrCode = parseQrCodeString(qrCodeString);

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
    return (
      <SafeAreaView
        style={{
          backgroundColor: colors.background,
          flex: 1,
        }}
      >
        <ThemedText className="mx-7.5 mt-7.5 flex-1">
          Venter på tilladelse til kameraet…
        </ThemedText>
      </SafeAreaView>
    );
  }

  if (!cameraPermissions.granted) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: colors.background,
          flex: 1,
        }}
      >
        <ThemedView className="flex-1 gap-7.5">
          <ThemedText className="mx-7.5 mt-10 text-center text-[30px]">
            Afventer tilladelse til at benytte kameraet
          </ThemedText>
          <ThemedTextButton onPress={requestCameraPermissions}>
            Giv adgang til kameraet
          </ThemedTextButton>
        </ThemedView>
      </SafeAreaView>
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
        <View className="mt-17.5 h-[220px] justify-end">
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
            qrCode={qrCode}
          />
        </View>
        <View className="mx-auto mb-20 w-67.5 justify-end">
          <SlideToConfirm
            buttonWidth={140}
            disabled={qrCode === undefined}
            onConfirm={applyQrCode}
            sliderWidth={250}
          >
            Bekræft
          </SlideToConfirm>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
});
