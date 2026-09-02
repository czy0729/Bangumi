/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:23:15
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-10 17:23:15
 */
// 与 RN StyleSheet.flatten 语义一致: falsy 返回 undefined, 对象原样返回, 数组递归展开后后者覆盖前者
function flattenStyle(style) {
  if (!style) return undefined
  if (!Array.isArray(style)) return style
  const result = {}
  for (let i = 0; i < style.length; ++i) {
    const computedStyle = flattenStyle(style[i])
    if (computedStyle) {
      for (const key in computedStyle) result[key] = computedStyle[key]
    }
  }
  return result
}

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
    flatten: flattenStyle
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
  BackHandler: {
    exitApp: jest.fn()
  },
  InteractionManager: {
    runAfterInteractions: fn => fn()
  }
}
