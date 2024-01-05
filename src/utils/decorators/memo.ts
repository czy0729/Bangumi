/*
 * @Author: czy0729
 * @Date: 2021-08-09 01:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 23:15:51
 */
import React from 'react'
import isEqual from 'lodash.isequal'
import { DEV } from '@/config'
import { AnyObject } from '@types'
import { withDev } from './utils'

type CustemCompareFn<P = Record<string, unknown>> = (
  targetProps?: P,
  prevProps?: P,
  nextProps?: P
) => boolean | object

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

function log(prev: AnyObject, next: AnyObject, devRerenderKey?: string) {
  const unsameKeys = []

  Object.keys(prev).forEach(key => {
    if (typeof prev[key] === 'object') {
      if (isEqual(prev[key], next[key])) return
    } else if (prev[key] === next[key]) return

    unsameKeys.push(key)
  })

  if (unsameKeys.length) {
    if (prev[unsameKeys[0]] === 'object') {
      log(prev[unsameKeys[0]], next[unsameKeys[0]], devRerenderKey)
      return
    }

    // 不打印 styles, 没意义
    if (unsameKeys[0]) {
      if (unsameKeys[0] === 'styles') {
        console.info('[update]', unsameKeys[0], '\n')
      } else {
        console.info(
          '[update]',
          devRerenderKey,
          '\n',
          `${unsameKeys[0]}:`,
          JSON.stringify(prev[unsameKeys[0]]),
          '=>',
          JSON.stringify(next[unsameKeys[0]]),
          '\n'
        )
      }
    }
  }
}

/**
 * 排除比较的 key
 *  - navigation
 *  - _loaded
 *  - 第一层 object._loaded
 *  - typeof function
 * */
function mapKey(target: AnyObject, key: string, value: any) {
  if (key === 'navigation' || key === '_loaded' || typeof value === 'function') return

  // 每次请求后, 不管数据源有没有变化, _loaded 都会变化
  // 只额外过滤第一层对象里面的 _loaded, 避免影响是否更新判断
  if (value && typeof value === 'object' && '_loaded' in value) {
    const { _loaded, ...other } = value
    target[key] = other
    return
  }

  target[key] = value
}

/** 封装通用 React.memo 的第二参数 */
function memoCompare(
  prevProps: AnyObject,
  nextProps: AnyObject,
  propsOrKeys: AnyObject | string[],
  dev?: boolean,
  devRerenderKey?: string
) {
  // 正常情况不会是 false, 这是留给强制更新的一个参数配合
  if (prevProps === false && nextProps === false) return false

  const checkEqualPrevProps = propsOrKeys ? {} : prevProps
  const checkEqualNextProps = propsOrKeys ? {} : nextProps
  if (propsOrKeys) {
    const checkEqualKeys = Array.isArray(propsOrKeys) ? propsOrKeys : Object.keys(propsOrKeys)
    checkEqualKeys.forEach(key => {
      mapKey(checkEqualPrevProps, key, prevProps[key])
      mapKey(checkEqualNextProps, key, nextProps[key])
    })
  }

  const notUpdate = isEqual(checkEqualPrevProps, checkEqualNextProps)
  if (dev && !notUpdate) log(checkEqualPrevProps, checkEqualNextProps, devRerenderKey)

  return notUpdate
}
