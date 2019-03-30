/*
 * @Author: czy0729
 * @Date: 2019-03-14 06:02:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-30 18:48:45
 */
import { Dimensions, StyleSheet, Platform } from 'react-native'

// Dimensions
const { width, height } = Dimensions.get('window')
export const window = {
  width,
  height,
  isSmallDevice: width < 375
}

// 统一布局单位
export const space = 20
export const wind = 16
export const xs = 4
export const sm = 8
export const md = 16
export const lg = 32

// 主题色
export const colorPlain = 'rgb(255, 255, 255)'
export const colorMain = 'rgb(252, 127, 138)'
export const colorPrimary = 'rgb(68, 207, 252)'
export const colorPrimaryLight = 'rgb(248, 253, 255)'
export const colorSuccess = 'rgb(50, 200, 64)'
export const colorWarning = 'rgb(254, 190, 88)'
export const colorWait = 'rgb(200, 200, 200)'
export const colorDisabled = 'rgb(150, 150, 150)'
export const colorBorder = 'rgb(223, 223, 223)'
export const colorBg = 'rgb(244, 244, 244)'
export const colorPlaceholder = '#fbfbfb'

// 文字
// export const colorTitle = 'rgb(8, 8, 8)'
export const colorTitle = 'rgb(50, 50, 50)'
export const colorDesc = 'rgb(50, 50, 50)'
export const colorSub = 'rgb(142, 142, 147)'
export const colorDefault = '#dddddd'
export const lineHeightRatio = 1.28

// other
export const radiusXs = 4
export const radiusSm = 8
export const radiusMd = 16
export const radiusLg = 32

// utils
export const shadow = Platform.select({
  ios: {
    shadowColor: 'black',
    shadowOffset: { height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  android: {
    elevation: 3
  }
})

// mixin
export function fontSize(pt) {
  return {
    fontSize: pt,
    lineHeight: pt * lineHeightRatio
  }
}

const Styles = {
  container: StyleSheet.create({
    content: {
      paddingTop: 30
    },
    flex: {
      flex: 1,
      backgroundColor: colorPlain
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
        shadowColor: 'black',
        shadowOffset: { height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
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
