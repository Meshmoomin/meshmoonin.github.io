import * as React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from "react-native-svg";
const FadeUpper = (props: SvgProps) => (
  <Svg
    width={props.width || "100%"}
    height={props.height || 121}
    viewBox="0 0 181 122"
    fill="none"
    {...props}
  >
    <Path d="M0 0H181V121H0V0Z" fill="url(#paint0_linear_54748_2114)" />
    <Defs>
      <LinearGradient
        id="paint0_linear_54748_2114"
        x1={90.5}
        y1={121}
        x2={90.5}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" stopOpacity={0} />
        <Stop offset={1} stopColor="white" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default FadeUpper;
