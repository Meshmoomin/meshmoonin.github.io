import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type FullSmileProps = SvgProps & {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const FullSmile = ({
  width = 36,
  height = 36,
  color = "black",
  ...props
}: FullSmileProps) => (
  <Svg width={width} height={height} viewBox="0 0 36 36" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.9783 34.2001C26.9253 34.2001 34.1783 26.9471 34.1783 18C34.1783 9.05304 26.9253 1.80005 17.9783 1.80005C9.03131 1.80005 1.77832 9.05304 1.77832 18C1.77832 26.9471 9.03131 34.2001 17.9783 34.2001Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.01499 19.8H26.8055C26.853 19.8 26.9003 19.805 26.9462 19.8149C27.239 19.8777 25.6442 27 17.9102 27C10.1763 27 8.71215 19.8 9.01499 19.8Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23.386 10.8C24.3801 10.8 25.186 11.6059 25.186 12.6C25.186 13.5232 24.4912 14.284 23.5959 14.3879L23.386 14.4C22.384 14.4 21.5781 13.5942 21.5781 12.6C21.5781 11.6769 22.273 10.9161 23.1682 10.8122L23.386 10.8Z"
      fill={color}
    />
    <Path
      d="M12.5862 10.8C13.5803 10.8 14.3862 11.6059 14.3862 12.6C14.3862 13.5232 13.6914 14.284 12.7961 14.3879L12.5862 14.4C11.5842 14.4 10.7783 13.5942 10.7783 12.6C10.7783 11.6769 11.4732 10.9161 12.3684 10.8122L12.5862 10.8Z"
      fill={color}
    />
  </Svg>
);

export default FullSmile;
