/*
 * @Author: czy0729
 * @Date: 2022-05-25 03:51:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-20 14:14:53
 */
import { StyleSheet } from 'react-native'
import { colorPlain } from '../colors'
import { bottom, radiusMd, sm, space, wind } from '../layout'

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
