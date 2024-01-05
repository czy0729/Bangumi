/*
 * @Author: czy0729
 * @Date: 2021-08-09 01:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 16:35:17
 */
import React from 'react'
import { DEV } from '@/config'
import { withDev } from '../utils'
import { memoCompare } from './utils'
import { CustemCompareFn } from './types'

/**
 * 封装通用 React.memo
 * @param {*} Component
 * @param {*} defaultProps
 * @param {*} param3 devRerenderKey | customCompareFn | dev
 * @param {*} param4 customCompareFn | dev
 * @param {*} param5 dev
 * @returns
 */
export default function memo<P, T extends React.FunctionComponent<P>>(
  Component: T,
  defaultProps: P,
  param3?: string | CustemCompareFn<P> | boolean,
  param4?: CustemCompareFn<P> | boolean,
  param5?: boolean
): T {
  if (defaultProps) Component.defaultProps = defaultProps

  let devRerenderKey: string
  let customCompareFn: CustemCompareFn<P>
  let dev: boolean

  // 处理第三个参数
  if (param3 !== undefined) {
    if (typeof param3 === 'string') {
      devRerenderKey = param3
    } else if (typeof param3 === 'function') {
      customCompareFn = param3
    } else if (typeof param3 === 'boolean') {
      dev = param3
    }
  }

  // 处理第四个参数
  if (param4 !== undefined) {
    if (typeof param4 === 'function') {
      customCompareFn = param4
    } else if (typeof param4 === 'boolean') {
      dev = param4
    }
  }

  // 处理第五个参数
  if (param5 !== undefined) {
    if (typeof param5 === 'boolean') {
      dev = param5
    }
  }

  // @ts-expect-error
  return React.memo(
    DEV && devRerenderKey ? withDev(Component, devRerenderKey) : Component,
    /** 返回 false 更新视图, true 不更新视图 */
    (prevProps: P, nextProps: P) => {
      if (typeof customCompareFn === 'function') {
        return memoCompare(
          customCompareFn(prevProps, prevProps, nextProps),
          customCompareFn(nextProps, prevProps, nextProps),
          Component.defaultProps,
          dev,
          devRerenderKey
        )
      }

      return memoCompare(prevProps, nextProps, Component.defaultProps, dev, devRerenderKey)
    }
  )
}
