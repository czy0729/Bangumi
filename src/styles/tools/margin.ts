/*
 * @Author: czy0729
 * @Date: 2022-05-25 03:51:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-20 14:14:53
 */
import { StyleSheet } from 'react-native'
import { _wind, headerHeight, lg, md, sm, xs } from '../layout'

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
  xlg: {
    marginTop: 80
  },
  wind: {
    marginTop: _wind
  },
  header: {
    marginTop: headerHeight
  },
  center: {
    marginTop: '46%'
  },
  _xs: {
    marginTop: -xs
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
  lg: {
    marginRight: lg
  },
  wind: {
    marginRight: _wind
  },
  _xxs: {
    marginRight: -2
  },
  _xs: {
    marginRight: -xs
  },
  _right: {
    marginRight: -xs
  },
  _sm: {
    marginRight: -sm
  },
  _md: {
    marginRight: -md
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
  },
  _xs: {
    marginBottom: -xs
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

/** margin-vertical (工具类) */
export const mv = StyleSheet.create({
  xs: {
    marginVertical: xs
  },
  sm: {
    marginVertical: sm
  },
  md: {
    marginVertical: md
  },
  lg: {
    marginVertical: lg
  }
} as const)

/** margin-horizontal (工具类) */
export const mh = StyleSheet.create({
  xs: {
    marginHorizontal: xs
  },
  sm: {
    marginHorizontal: sm
  },
  md: {
    marginHorizontal: md
  },
  lg: {
    marginHorizontal: lg
  }
} as const)
