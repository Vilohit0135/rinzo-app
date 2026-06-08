import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;

export const scale = (size: number) => (width / BASE_WIDTH) * size;
export const verticalScale = scale;
export const moderateScale = scale;

const fontScaleFactor = Math.min(width / BASE_WIDTH, 1.2);

export const responsiveFontSize = (size: number) =>
  PixelRatio.roundToNearestPixel(size * fontScaleFactor);
