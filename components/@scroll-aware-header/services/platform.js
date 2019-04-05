import { Platform, Dimensions, StatusBar } from 'react-native';

const { height } = Dimensions.get('window');
const IPHONE_XR_HEIGHT = 896;
const IPHONE_X_HEIGHT = 812;
const IPHONE_5_HEIGHT = 568;

function isIOS() {
  return Platform.OS === 'ios';
}

function isAndroid() {
  return Platform.OS === 'android';
}

function isIPhoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === IPHONE_X_HEIGHT || height === IPHONE_XR_HEIGHT)
  );
}

function isIPhone5() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    height === IPHONE_5_HEIGHT
  );
}

function ifIPhoneX(iPhoneXStyle) {
  if (isIPhoneX()) {
    return iPhoneXStyle;
  }

  return {};
}

function ifIPhone5(iPhone5Style) {
  if (isIPhone5()) {
    return iPhone5Style;
  }

  return {};
}

function ifAndroid(AndroidStyle) {
  if (isAndroid()) {
    return AndroidStyle;
  }

  return {};
}

function ifIOS(iOSStyle) {
  if (isIOS()) {
    return iOSStyle;
  }

  return {};
}

function getStatusBarHeight() {
  if (isAndroid()) {
    return StatusBar.currentHeight;
  }

  if (isIPhoneX()) {
    return 44;
  }

  return 20; // other ios devices
}

function getTitleBarHeight() {
  return isAndroid() ? 56 : 44;
}

export default {
  isIOS,
  isAndroid,
  isIPhone5,
  isIPhoneX,
  ifIOS,
  ifAndroid,
  ifIPhone5,
  ifIPhoneX,
  getStatusBarHeight,
  getTitleBarHeight,
};
