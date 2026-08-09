import { Redirect } from "expo-router";
import { DevScreensScreen } from "../devScreens/DevScreensScreen";

const DevRoute = () => (__DEV__ ? <DevScreensScreen /> : <Redirect href="/" />);

export default DevRoute;
