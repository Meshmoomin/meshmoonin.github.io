import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";
const CheckMark = (props: SvgProps) => (
  <Svg
    width={props.width || 186}
    height={props.height || 186}
    viewBox="0 0 186 186"
    fill="none"
    {...props}
  >
    <Circle
      cx={92.8798}
      cy={92.5944}
      r={87.5775}
      stroke="#009951"
      strokeWidth={10}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M81.7396 111.256L139.046 53.9489L147.766 62.6685L81.7396 128.695L46.5464 93.5018L55.2661 84.7822L81.7396 111.256Z"
      fill="#009951"
    />
  </Svg>
);
export default CheckMark;
