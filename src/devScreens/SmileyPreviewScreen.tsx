import { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconsRow } from "../iconsRow/IconsRow";
import { SmileyIcon } from "../iconsRow/SmileyIcon";
import { SmileyOutlineIcon } from "../iconsRow/SmileyOutlineIcon";
import { maximumIcons } from "../mainState/maximumIcons";
import { BigSmiley } from "../smiley/BigSmiley";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { useColors } from "../themed/useColors";

const initialPercentage = 0;
const fillLevels = [0, 10, 20, 30, 90, 100];
const includedSmileys = 6;

export const SmileyPreviewScreen = () => {
  const colors = useColors();
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <ThemedView className="flex-1 justify-center gap-10">
        <BigSmiley percentage={percentage} />
        <View className="flex-row">
          {fillLevels.map((fillLevel) => (
            // A Pressable in place of the View that held the smiley before, so that making these tappable leaves the row laid out exactly as it was.
            <Pressable
              className="flex-1 items-center gap-1"
              key={fillLevel}
              onPress={() => {
                setPercentage(fillLevel);
              }}
            >
              <BigSmiley percentage={fillLevel} />
              <ThemedText className="text-[14px]">{`${fillLevel}%`}</ThemedText>
            </Pressable>
          ))}
        </View>
        <IconsRow
          currentValue={includedSmileys}
          excludedIcon={<SmileyOutlineIcon />}
          gap={3}
          includedIcon={<SmileyIcon />}
          maximum={maximumIcons}
          size={30}
        />
      </ThemedView>
    </SafeAreaView>
  );
};
