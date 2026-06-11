import React from 'react';
import Svg, { Rect, Circle, Line, Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

export const WashingMachineIcon = ({
  width = 24,
  height = 24,
  color = '#7C5CE6',
  strokeWidth = 2,
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Rect x="4" y="3" width="16" height="18" rx="2" />
    <Circle cx="12" cy="13" r="4" />
    <Circle cx="8" cy="7" r="0.75" fill={color} />
    <Circle cx="11" cy="7" r="0.75" fill={color} />
    <Line x1="14" y1="7" x2="16" y2="7" />
  </Svg>
);

export const SteamIronIcon = ({
  width = 24,
  height = 24,
  color = '#7C5CE6',
  strokeWidth = 2,
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M4 18h16l1.24-3.73A3 3 0 0 0 18.4 10H8.5a6 6 0 0 0-6 6v2z" />
    <Path d="M9 10V6a2 2 0 0 1 2-2h4" />
    <Circle cx="13" cy="14" r="1.5" />
  </Svg>
);

export const HangerIcon = ({
  width = 24,
  height = 24,
  color = '#7C5CE6',
  strokeWidth = 2,
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 2v3" />
    <Path d="M12 5a3 3 0 0 1 3 3v2" />
    <Path d="M2 17l10-8 10 8H2z" />
  </Svg>
);
