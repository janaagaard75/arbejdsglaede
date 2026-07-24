import { Link, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export const NotFoundScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t("oops") }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold">{t("thisScreenDoesNotExist")}</Text>
        <Link
          className="mt-3.75 py-3.75"
          href="/"
        >
          <Text className="text-sm text-[#2e78b7]">{t("goToHomeScreen")}</Text>
        </Link>
      </View>
    </>
  );
};
