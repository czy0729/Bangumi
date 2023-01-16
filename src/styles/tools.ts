/*
 * @Author: czy0729
 * @Date: 2022-05-25 03:51:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-16 08:09:34
 */
import { StyleSheet } from 'react-native'
import { IOS } from '@constants/constants'
import {
  ratio,
  xs,
  sm,
  md,
  lg,
  wind,
  _wind,
  space,
  bottom,
  radiusXs,
  radiusSm,
  radiusMd,
  statusBarHeight,
  headerHeight,
  tabsHeaderHeight,
  IS_IOS_5_6_7_8
} from './layout'
import { colorPlain, colorBorder, colorShadow } from './colors'
import { fontSize } from './utils'

/** 容器布局 (工具类) */
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
  },
  touch: {
    borderRadius: radiusMd,
    overflow: 'hidden'
  },
  block: {
    width: '100%'
  },
  w100: {
    width: '100%'
  },
  h100: {
    height: '100%'
  }
} as const)

/** 高度 (工具类) */
export const h = StyleSheet.create({
  100: {
    height: '100%'
  }
} as const)

/** margin-top (工具类) */
export const mt = StyleSheet.create({
  z: {
    marginTop: 0
  },
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
  },
  _sm: {
    marginTop: -sm
  },
  _md: {
    marginTop: -md
  }
} as const)

/** margin-right (工具类) */
export const mr = StyleSheet.create({
  xxs: {
    marginRight: 2
  },
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
  },
  _xs: {
    marginRight: -xs
  },
  _right: {
    marginRight: -xs
  },
  _sm: {
    marginRight: -sm
  }
} as const)

/** margin-bottom (工具类) */
export const mb = StyleSheet.create({
  xxs: {
    marginBottom: 2
  },
  xs: {
    marginBottom: xs
  },
  sm: {
    marginBottom: sm
  },
  md: {
    marginBottom: md
  },
  lg: {
    marginBottom: lg
  }
} as const)

/** margin-left (工具类) */
export const ml = StyleSheet.create({
  xxs: {
    marginLeft: 2
  },
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
  },
  _xs: {
    marginLeft: -xs
  },
  _sm: {
    marginLeft: -sm
  },
  _md: {
    marginLeft: -md
  }
} as const)

/** 边框 (工具类) */
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
} as const)

/** 圆角 (工具类) */
export const radius = StyleSheet.create({
  xs: {
    borderRadius: radiusXs,
    overflow: 'hidden'
  },
  sm: {
    borderRadius: radiusSm,
    overflow: 'hidden'
  }
} as const)

/** 阴影 (工具类) */
export const shadow = {
  shadowColor: colorShadow,
  shadowOffset: {
    width: 1,
    height: 4
  },
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 16
} as const

/** 缩放 (工具类) */
export const scale = {
  transform: [
    {
      scale: 0.64
    }
  ]
} as const

/** 旋转 (工具类) */
export const rotate = {
  transform: [
    {
      rotate: '180deg'
    }
  ]
} as const

/** @deprecated 垂直缩小 (工具类) */
export const short = {
  marginVertical: -md
} as const

/** @deprecated */
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
} as const)

/** @deprecated */
export const header = StyleSheet.create({
  left: {
    position: 'absolute',
    top: IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12,
    left: 4
  },
  right: {
    position: 'absolute',
    top: IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12,
    right: 8
  }
} as const)

/** @deprecated */
export const listViewProps = IOS
  ? {
      // contentInset: {
      //   top: tabsHeaderHeight * ratio
      // },
      contentOffset: {
        y: -tabsHeaderHeight * ratio
      }
    }
  : {}

/** 安卓部分机型文字若不至少传递字体, 会出现文字截断现象 */
export const androidTextFixedStyle = {
  fontFamily: ''
} as const
