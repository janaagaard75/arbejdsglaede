import Svg, { Path } from "react-native-svg";

// https://tabler.io/icons/icon/arrow-big-right-lines
interface Props {
  readonly color: string;
}

export const ArrowRightIcon = (props: Props) => (
  <Svg
    fill="none"
    height="24"
    stroke={props.color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
  >
    <Path
      d="M0 0h24v24H0z"
      fill="none"
      stroke="none"
    />
    <Path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z" />
    <Path d="M3 9v6" />
    <Path d="M6 9v6" />
  </Svg>
);
