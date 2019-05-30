/* eslint-disable indent */
/*
 * @Author: czy0729
 * @Date: 2019-03-14 06:02:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-30 03:27:18
 */
import { Dimensions, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import { IOS } from '@constants'

// -------------------- 设备 --------------------
const { width, height } = Dimensions.get('window')
export const window = {
  width,
  maxWidth: width, // @todo 以后兼容IPAD
  height
}
export const logoWidth = 124 // logo宽度
export const { statusBarHeight } = Constants // 状态栏高度
export const appBarHeight = IOS ? 44 : 56 // 单独头部高度
export const headerHeight = appBarHeight + statusBarHeight // 整个头部高度
export const tabsHeight = 42 // 标签页的标签栏高度
export const tabsHeaderHeight = headerHeight + tabsHeight // 带标签栏的头部高度
export const tabBarHeight = 50 // 标签栏高度

// -------------------- 统一布局单位 --------------------
export const space = 20 // 上下
export const wind = 16 // 两翼
export const bottom = tabBarHeight + space // 底部留空
export const xs = 4
export const sm = 8
export const md = 16
export const lg = 32

// -------------------- 主题色 --------------------
export const colorPlainRaw = [255, 255, 255]
export const colorPlain = `rgb(${colorPlainRaw.join()})`
export const colorMain = 'rgb(252, 127, 138)' // #FC7F8A
export const colorMainLight = 'rgb(255, 243, 244)'
export const colorMainBorder = 'rgb(252, 128, 138)'
export const colorPrimary = 'rgb(68, 207, 252)'
export const colorPrimaryLight = 'rgb(248, 253, 255)'
export const colorPrimaryBorder = 'rgb(159, 230, 254)'
export const colorSuccess = 'rgb(50, 200, 64)'
export const colorSuccessLight = 'rgb(236, 255, 236)'
export const colorSuccessBorder = 'rgb(115, 241, 115)'
export const colorWarning = 'rgb(254, 190, 88)'
export const colorWarningLight = 'rgb(255, 248, 238)'
export const colorWarningBorder = 'rgb(254, 190, 88)'
export const colorDanger = 'rgb(232, 8, 13)'
export const colorWait = 'rgb(200, 200, 200)'
export const colorDisabled = 'rgb(150, 150, 150)'
export const colorBorder = 'rgb(222, 222, 222)'
export const colorBg = 'rgb(248, 248, 248)'
export const colorPlaceholder = 'rgb(250, 250, 250)'
export const colorHighLight = 'rgba(0, 0, 0, 0.16)'
export const colorShadow = 'rgb(0, 0, 0)'

// -------------------- 文字 --------------------
export const colorTitleRaw = [12, 12, 12]
export const colorTitle = `rgb(${colorTitleRaw.join()})`
export const colorDesc = 'rgb(40, 40, 40)' // #282828
export const colorSub = 'rgb(142, 142, 147)' // #8E8E93
export const colorIcon = 'rgb(200, 200, 200)' // #C8C8C8
export const colorIconPlain = `rgba(${colorPlainRaw.join()}, 0.88)`
export const lineHeightRatio = 1.28

// -------------------- 圆角 --------------------
export const radiusXs = 4
export const radiusSm = 8
export const radiusMd = 16
export const radiusLg = 32

// -------------------- 其他 --------------------
export const shadow = IOS
  ? {
      shadowColor: colorShadow,
      shadowOffset: { height: 3 },
      shadowOpacity: 0.16,
      shadowRadius: 4
    }
  : {
      backgroundColor: colorPlain,
      borderRadius: 5,
      overflow: 'hidden',
      elevation: 3
    }

// --------------------  函数 --------------------
export function fontSize(pt) {
  return {
    fontSize: pt,
    lineHeight: pt * lineHeightRatio
  }
}

// -------------------- 工具样式 --------------------
export const container = StyleSheet.create({
  flex: {
    flex: 1
  },
  screen: {
    flex: 1,
    backgroundColor: colorBg
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
  }
})

export const h = StyleSheet.create({
  100: {
    height: '100%'
  }
})

export const mt = StyleSheet.create({
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
    marginTop: wind
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
    marginRight: wind
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
  wind: {
    marginLeft: wind
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
