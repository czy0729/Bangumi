/*
 * @Author: czy0729
 * @Date: 2019-03-14 06:02:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 02:29:14
 */
import { Dimensions, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { IOS } from '@constants'

// -------------------- 设备 --------------------
const { width, height } = Dimensions.get('window')
const maxWidth = 544
export const window = {
  width,
  maxWidth,
  contentWidth: Math.min(width, maxWidth),
  height
}
export const logoWidth = 124 // logo宽度
export const isPad = width > 616
export const statusBarHeight = Constants.statusBarHeight
export const appBarHeight = IOS ? 44 : 56 // 单独头部高度
export const headerHeight = appBarHeight + statusBarHeight // 整个头部高度
export const tabsHeight = 42 // 标签页的标签栏高度
export const tabsHeaderHeight = headerHeight + tabsHeight // 带标签栏的头部高度
export const tabBarHeight = 50 // 标签栏高度

// -------------------- 统一布局单位 --------------------
export const { hairlineWidth } = StyleSheet
export const xs = isPad ? 8 : 4
export const sm = isPad ? 12 : 8
export const md = isPad ? 24 : 16
export const lg = isPad ? 48 : 32
export const wind = isPad ? parseInt((width - maxWidth) / 2) : 16 // 两翼
export const _wind = 16
export const space = isPad ? 24 : 16 // 上下
export const bottom = tabBarHeight + lg // 底部留空

// -------------------- 主题色 --------------------
export const colorMain = 'rgb(254, 138, 149)'
export const colorMainBorder = 'rgb(252, 128, 138)'
export const colorPrimary = 'rgb(13, 183, 243)'
export const colorPrimaryBorder = 'rgb(159, 230, 254)'
export const colorPrimaryLight = 'rgb(237, 250, 254)'
export const colorSuccess = 'rgb(50, 200, 64)'
export const colorSuccessBorder = 'rgb(115, 241, 115)'
export const colorWarning = 'rgb(254, 190, 88)'
export const colorWarningBorder = 'rgb(254, 190, 88)'
export const colorDanger = 'rgb(232, 8, 13)'
export const colorPlain = 'rgb(255, 255, 255)'
export const colorPlaceholder = 'rgb(250, 250, 250)'
export const colorDark = 'rgb(0, 0, 0)'
export const colorHighLight = 'rgba(0, 0, 0, 0.16)'
export const colorShadow = 'rgb(0, 0, 0)'
export const colorMask = 'rgba(0, 0, 0, 0.5)'

export const colorPlainHex = '#ffffff'
export const colorYellow = 'rgb(255, 202, 40)'
export const colorWait = 'rgb(200, 200, 200)'
export const colorBg = 'rgb(238, 238, 240)'
export const colorBorder = 'rgb(228, 228, 236)'

export const colorTitle = 'rgb(0, 0, 0)'
export const colorDesc = 'rgb(12, 12, 12)'
export const colorSub = 'rgb(128, 128, 128)'
export const colorDisabled = 'rgb(150, 150, 150)'
export const colorIcon = 'rgb(200, 200, 200)'

export const colorMainRaw = colorMain.match(/\d+/g)
export const colorPrimaryRaw = colorPrimary.match(/\d+/g)
export const colorSuccessRaw = colorSuccess.match(/\d+/g)
export const colorWarningRaw = colorWarning.match(/\d+/g)
export const colorPlainRaw = colorPlain.match(/\d+/g)
export const colorTitleRaw = colorTitle.match(/\d+/g)
export const colorMainLight = `rgba(${colorMainRaw.join()}, 0.1)`
export const colorSuccessLight = `rgba(${colorSuccessRaw.join()}, 0.1)`
export const colorWarningLight = `rgba(${colorWarningRaw.join()}, 0.1)`

// -------------------- dark --------------------
// 架高层, 参考 https://www.zcool.com.cn/article/ZMTAwMzI4OA==.html
export const _colorDarkModeLevel1 = 'rgb(62, 62, 64)'
export const _colorDarkModeLevel1Hex = '#3e3e40'
export const _colorDarkModeLevel2 = 'rgb(88, 88, 90)'

// 基础层
export const _colorMain = 'rgb(254, 138, 149)'
export const _colorMainLight = 'rgb(59, 48 ,51)'
export const _colorPrimary = 'rgb(35, 149, 233)'
export const _colorSuccess = 'rgb(50, 209, 96)'
export const _colorYellow = 'rgb(255, 214, 50)'
export const _colorWarning = 'rgb(255, 160, 12)'
export const _colorPlain = 'rgb(46, 46, 48)'
export const _colorWait = 'rgb(78, 78, 80)'
export const _colorBg = 'rgb(34, 34, 36)'
export const _colorBorder = 'rgba(255, 255, 255, 0.16)'

// 文字
export const _colorTitle = 'rgba(255, 255, 255, 0.92)'
export const _colorDesc = 'rgba(255, 255, 255, 0.8)'
export const _colorSub = 'rgba(255, 255, 255, 0.52)'
export const _colorDisabled = 'rgba(255, 255, 255, 0.38)'
export const _colorIcon = 'rgba(255, 255, 255, 0.38)'

export const _colorDarkModeLevel1Raw = _colorDarkModeLevel1.match(/\d+/g)
export const _colorPlainRaw = _colorPlain.match(/\d+/g)
export const _colorTitleRaw = [255, 255, 255]

// -------------------- 小圣杯 --------------------
export const colorBid = 'rgb(0, 173, 146)'
export const colorDepthBid = 'rgb(15, 61, 67)'
export const colorAsk = 'rgb(209, 77, 100)'
export const colorDepthAsk = 'rgb(39, 36, 52)'
export const colorTinygrailPlain = 'rgba(255, 255, 255, 0.8)'
export const colorTinygrailPrimary = 'rgb(9, 153, 223)'
export const colorTinygrailBg = 'rgb(14, 25, 36)'
export const colorTinygrailContainer = 'rgb(20, 30, 50)'
export const colorTinygrailContainerHex = '#141e32'
export const colorTinygrailBorder = 'rgb(29, 42, 61)'
export const colorTinygrailIcon = 'rgb(62, 84, 108)'
export const colorTinygrailText = 'rgb(99, 117, 144)'
export const colorTinygrailActive = 'rgb(39, 40, 46)'

export const _colorBid = 'rgb(1, 173, 145)'
export const _colorDepthBid = 'rgb(226, 241, 238)'
export const _colorAsk = 'rgb(206, 97, 117)'
export const _colorDepthAsk = 'rgb(243, 233, 234)'
export const _colorTinygrailPlain = 'rgb(39, 43, 48)'
export const _colorTinygrailPrimary = 'rgb(42, 114, 241)'
export const _colorTinygrailBg = 'rgb(240, 241, 243)'
export const _colorTinygrailContainer = 'rgb(255, 255, 255)'
export const _colorTinygrailContainerHex = '#ffffff'
export const _colorTinygrailBorder = colorBorder
export const _colorTinygrailIcon = 'rgb(172, 182, 188)'
export const _colorTinygrailText = 'rgb(160, 160, 160)'
export const _colorTinygrailActive = 'rgb(247, 242, 232)'

// -------------------- 文字 --------------------
export const colorAvatar = 'rgb(116, 116, 116)'
export const colorIconPlain = `rgba(${colorPlainRaw.join()}, 0.88)`
export const lineHeightRatio = 1.32

// -------------------- 圆角 --------------------
export const radiusXs = 4
export const radiusSm = 6
export const radiusMd = 12
export const radiusLg = 16

// -------------------- 其他 --------------------
export const shadow = {
  shadowColor: colorShadow,
  shadowOffset: {
    height: 4
  },
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 8
}

// --------------------  函数 --------------------
export const fontSizeAdjust = 0
export function fontSize(pt, fontSizeAdjust = 0) {
  return {
    fontSize: pt + fontSizeAdjust,
    lineHeight: (pt + fontSizeAdjust) * lineHeightRatio
  }
}

// -------------------- 工具样式 --------------------
export const container = StyleSheet.create({
  flex: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: colorPlain
  },
  screen: {
    flex: 1
    // backgroundColor: colorBg
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outer: {
    paddingHorizontal: wind,
    paddingTop: space,
    paddingBottom: bottom
  },
  inner: {
    paddingVertical: space,
    paddingHorizontal: wind
  },
  wind: {
    paddingHorizontal: wind
  },
  bottom: {
    paddingBottom: bottom
  },
  sm: {
    padding: sm
  }
})

export const h = StyleSheet.create({
  100: {
    height: '100%'
  }
})

export const mt = StyleSheet.create({
  xxs: {
    marginTop: 2
  },
  xs: {
    marginTop: xs
  },
  sm: {
    marginTop: sm
  },
  md: {
    marginTop: md
  },
  lg: {
    marginTop: lg
  },
  wind: {
    marginTop: _wind
  },
  header: {
    marginTop: headerHeight
  }
})

export const mr = StyleSheet.create({
  xs: {
    marginRight: xs
  },
  sm: {
    marginRight: sm
  },
  md: {
    marginRight: md
  },
  wind: {
    marginRight: _wind
  }
})

export const mb = StyleSheet.create({
  xs: {
    marginBottom: xs
  },
  sm: {
    marginBottom: sm
  },
  md: {
    marginBottom: md
  }
})

export const ml = StyleSheet.create({
  xs: {
    marginLeft: xs
  },
  sm: {
    marginLeft: sm
  },
  md: {
    marginLeft: md
  },
  lg: {
    marginLeft: lg
  },
  wind: {
    marginLeft: _wind
  }
})

export const border = StyleSheet.create({
  vh: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colorBorder
  },
  top: {
    borderStyle: 'solid',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorBorder
  }
})

export const radius = StyleSheet.create({
  xs: {
    borderRadius: radiusXs,
    overflow: 'hidden'
  },
  sm: {
    borderRadius: radiusSm,
    overflow: 'hidden'
  }
})

export const input = StyleSheet.create({
  base: {
    padding: 8,
    width: '100%',
    ...fontSize(14),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorBorder,
    borderRadius: radiusXs
  },
  multi: {
    padding: 8,
    width: '100%',
    ...fontSize(14),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorBorder,
    borderRadius: radiusXs
  }
})

export const header = StyleSheet.create({
  left: {
    position: 'absolute',
    top: IOS ? statusBarHeight + 8 : statusBarHeight + 12,
    left: 4
  },
  right: {
    position: 'absolute',
    top: IOS ? statusBarHeight + 8 : statusBarHeight + 12,
    right: 8
  }
})

export default module.exports
