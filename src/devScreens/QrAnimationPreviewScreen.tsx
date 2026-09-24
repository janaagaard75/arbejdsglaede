import { runInAction } from "mobx";
import { View } from "react-native";
import { HomeScreen } from "../homeScreen/HomeScreen";
import { KnownQrCode } from "../mainState/KnownQrCode";
import { mainStore, MainValues } from "../mainState/mainStore";
import { ThemedTextButton } from "../themed/ThemedTextButton";

interface Scenario {
  initialValues: MainValues;
  label: string;
  qrCode: KnownQrCode;
}

const scenarios: ReadonlyArray<Scenario> = [
  {
    initialValues: { hearts: 2, percentage: 80, smileys: 0 },
    label: "80% + 30pp",
    qrCode: { amount: 30, type: "percentage" },
  },
  {
    initialValues: { hearts: 2, percentage: 10, smileys: 1 },
    label: "110% − 20pp",
    qrCode: { amount: -20, type: "percentage" },
  },
  {
    initialValues: { hearts: 2, percentage: 20, smileys: 0 },
    label: "+ heart",
    qrCode: { amount: 1, type: "heart" },
  },
  {
    initialValues: { hearts: 2, percentage: 20, smileys: 0 },
    label: "− heart",
    qrCode: { amount: -1, type: "heart" },
  },
];

const playScenario = (scenario: Scenario) => {
  runInAction(() => {
    mainStore.hearts = scenario.initialValues.hearts;
    mainStore.pendingQrChange = undefined;
    mainStore.percentage = scenario.initialValues.percentage;
    mainStore.smileys = scenario.initialValues.smileys;
    mainStore.applyQrCode(scenario.qrCode);
  });
};

export const QrAnimationPreviewScreen = () => (
  <View className="flex-1">
    <HomeScreen />
    <View className="absolute right-2 bottom-2 left-2 flex-row flex-wrap justify-center gap-2">
      {scenarios.map((scenario) => (
        <ThemedTextButton
          key={scenario.label}
          onPress={() => {
            playScenario(scenario);
          }}
          variant="secondary"
        >
          {scenario.label}
        </ThemedTextButton>
      ))}
    </View>
  </View>
);
