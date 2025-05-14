import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type OkChevronProps = SvgProps & {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const OkChevron = ({
  width = 40,
  height = 41,
  color = "#4F4F4F",
  ...props
}: OkChevronProps) => (
  <Svg width={width} height={height} viewBox="0 0 40 41" fill="none" {...props}>
    <Path
      d="M11.4479 9.05212L22.8958 20.5L11.4479 31.9479L10.7408 32.655L11.4479 33.3621L13.8046 35.7188L14.5117 36.4259L15.2188 35.7188L29.7305 21.2071L30.4376 20.5L29.7305 19.7929L15.2188 5.28124L14.5117 4.57413L13.8046 5.28124L11.4479 7.6379L10.7408 8.34501L11.4479 9.05212Z"
      fill={color}
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

export default OkChevron;
