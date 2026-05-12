/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:23:15
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-10 17:23:15
 */
module.exports = {
  Platform: {
    OS: 'ios',
    select: obj => obj.ios || obj.default
  },
  Dimensions: {
    get: () => ({ width: 375, height: 812, scale: 3, fontScale: 1 })
  },
  StyleSheet: {
    create: styles => styles,
    flatten: style => style
  },
  PixelRatio: {
    get: () => 3,
    getPixelSizeForLayoutSize: size => size * 3,
    roundToNearestPixel: size => size
  },
  Linking: {
    openURL: jest.fn(),
    canOpenURL: jest.fn(() => Promise.resolve(true))
  },
  Alert: {
    alert: jest.fn()
  },
  NativeModules: {},
  NativeEventEmitter: class NativeEventEmitter {
    addListener() { return { remove: jest.fn() } }
    removeAllListeners() {}
  },
  InteractionManager: {
    runAfterInteractions: fn => fn()
  }
}
