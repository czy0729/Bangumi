/*
 * @Author: czy0729
 * @Date: 2019-03-14 06:02:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-08 01:50:44
 */
import { Dimensions, StyleSheet, Platform } from 'react-native'

const isIOS = Platform.OS === 'ios'

// 设备
const { width, height } = Dimensions.get('window')
export const window = {
  width,
  maxWidth: width, // @todo 用来兼容IPAD
  height,
  isSmallDevice: width < 375,
  isLargeDevice: width > 375
}
export const appbarHeight = isIOS ? 44 : 56
export const statusBarHeight = isIOS ? 20 : 0
export const headerHeight = appbarHeight + statusBarHeight + 22 // @? 不确定是否22

// 统一布局单位
export const space = 20
export const wind = 16
export const xs = 4
export const sm = 8
export const md = 16
export const lg = 32

// 主题色
export const colorPlainRaw = [255, 255, 255]
export const colorPlain = `rgb(${colorPlainRaw.join()})`
export const colorMain = 'rgb(252, 127, 138)'
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

// 文字
export const colorTitleRaw = [12, 12, 12]
export const colorTitle = `rgb(${colorTitleRaw.join()})`
export const colorDesc = 'rgb(40, 40, 40)'
export const colorSub = 'rgb(142, 142, 147)'
export const colorIcon = 'rgb(200, 200, 200)'
export const lineHeightRatio = 1.28

// 圆角
export const radiusXs = 5
export const radiusSm = 8
export const radiusMd = 16
export const radiusLg = 32

// 其他
export const shadow = Platform.select({
  ios: {
    shadowColor: colorShadow,
    shadowOffset: { height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 4
  },
  android: {
    backgroundColor: colorPlain,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 3
  }
})

// 函数
export function fontSize(pt) {
  return {
    fontSize: pt,
    lineHeight: pt * lineHeightRatio
  }
}

// 工具样式
const Styles = {
  container: StyleSheet.create({
    safeArea: {
      paddingTop: appbarHeight
    },
    content: {
      paddingTop: 30
    },
    flex: {
      flex: 1
    },
    column: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorPlain
    },
    row: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorPlain
    },
    outer: {
      paddingVertical: space,
      paddingHorizontal: wind
    },
    inner: {
      paddingVertical: wind,
      paddingHorizontal: wind
    },
    wind: {
      paddingHorizontal: wind
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
    item: Platform.select({
      ios: {
        shadowColor: '#333',
        shadowOffset: { height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 8
      },
      android: {
        elevation: 1
      }
    })
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
  })
}

export default Styles
