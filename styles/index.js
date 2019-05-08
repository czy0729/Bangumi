/* eslint-disable indent */
/*
 * @Author: czy0729
 * @Date: 2019-03-14 06:02:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 20:39:05
 */
import { Dimensions, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import { IOS } from '@constants'

// -------------------- 设备 --------------------
const { width, height } = Dimensions.get('window')
export const window = {
  width,
  maxWidth: width, // @todo 用来兼容IPAD
  height,
  isSmallDevice: width < 375,
  isLargeDevice: width > 375
}
export const logoWidth = 120 // logo宽度
export const statusBarHeight = IOS ? Constants.statusBarHeight - 6 : 0 // 状态栏高度, IOS的Constants.statusBarHeight不知道为什么多了6
export const appBarHeight = IOS ? 44 : 56 // 单独头部高度
export const headerHeight = appBarHeight + statusBarHeight // 整个头部高度
export const tabsHeight = 42 // 标签页的标签栏高度
export const tabsHeaderHeight = headerHeight + tabsHeight // 带标签栏的头部高度
export const tabBarHeight = 50 // 标签栏高度

// -------------------- 统一布局单位 --------------------
export const space = 20
export const wind = 16
export const bottom = tabBarHeight + space
export const xs = 4
export const sm = 8
export const md = 16
export const lg = 32

// -------------------- 主题色 --------------------
export const colorPlainRaw = [255, 255, 255]
export const colorPlain = `rgb(${colorPlainRaw.join()})`
export const colorMain = 'rgb(252, 127, 138)' // #FC7F8A
export const colorMainLight = 'rgb(255, 243, 244)'
export const colorPrimary = 'rgb(68, 207, 252)'
export const colorPrimaryLight = 'rgb(248, 253, 255)'
export const colorSuccess = 'rgb(50, 200, 64)'
export const colorWarning = 'rgb(254, 190, 88)'
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
const Styles = {
  container: StyleSheet.create({
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
  }),

  h: StyleSheet.create({
    100: {
      height: '100%'
    }
  }),

  mt: StyleSheet.create({
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
  }),

  mr: StyleSheet.create({
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
  }),

  mb: StyleSheet.create({
    xs: {
      marginBottom: xs
    },
    sm: {
      marginBottom: sm
    },
    md: {
      marginBottom: md
    }
  }),

  ml: StyleSheet.create({
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
  }),

  border: StyleSheet.create({
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
  }),

  radius: StyleSheet.create({
    xs: {
      borderRadius: radiusXs,
      overflow: 'hidden'
    },
    sm: {
      borderRadius: radiusSm,
      overflow: 'hidden'
    }
  }),

  shadow: StyleSheet.create({
    item: IOS
      ? {
          shadowColor: '#333',
          shadowOffset: { height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 8
        }
      : {
          elevation: 1
        }
  }),

  input: StyleSheet.create({
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
  }),

  header: StyleSheet.create({
    left: {
      position: 'absolute',
      top: statusBarHeight + 8,
      left: 4
    }
  })
}

export default Styles
