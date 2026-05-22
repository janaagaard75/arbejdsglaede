import { Text, View } from "react-native";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";

export const EditScreenInfo = ({ path }: { path: string }) => {
  return (
    <View>
      <View className="items-center mx-12.5">
        <Text className="text-[17px] leading-6 text-center text-black/80 dark:text-white/80">
          Open up the code for this screen:
        </Text>

        <View className="rounded-[3px] px-1 my-1.75 bg-black/5 dark:bg-white/5">
          <MonoText>{path}</MonoText>
        </View>

        <Text className="text-[17px] leading-6 text-center text-black/80 dark:text-white/80">
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>

      <View className="mt-3.75 mx-5 items-center">
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
