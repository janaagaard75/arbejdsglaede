import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../themed/ThemedText";
import { ThemedTextButton } from "../themed/ThemedTextButton";
import { ThemedView } from "../themed/ThemedView";
import { useColors } from "../themed/useColors";

interface Props {
  readonly onRequestCameraPermissions: () => void;
}

export const CameraPermissionRequired = (props: Props) => {
  const { t } = useTranslation();
  const colors = useColors();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <ThemedView className="flex-1 gap-7.5">
        <ThemedText className="mx-7.5 mt-10 text-center text-[30px]">
          {t("cameraPermissionRequired")}
        </ThemedText>
        <ThemedTextButton
          onPress={props.onRequestCameraPermissions}
          variant="primary"
        >
          {t("grantCameraAccess")}
        </ThemedTextButton>
      </ThemedView>
    </SafeAreaView>
  );
};
