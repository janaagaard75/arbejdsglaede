import { Text, View } from "react-native";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";

export const EditScreenInfo = ({ path }: { path: string }) => {
  return (
    <View>
      <View className="mx-12.5 items-center">
        <Text className="text-center text-[17px] leading-6 text-black/80 dark:text-white/80">
          Open up the code for this screen:
        </Text>
        <View className="my-1.75 rounded-[3px] bg-black/5 px-1 dark:bg-white/5">
          <MonoText>{path}</MonoText>
        </View>
        <Text className="text-center text-[17px] leading-6 text-black/80 dark:text-white/80">
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>
      <View className="mx-5 mt-3.75 items-center">
        <ExternalLink
          className="py-3.75"
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
        >
          <Text className="text-center text-[#2f95dc]">
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
};
