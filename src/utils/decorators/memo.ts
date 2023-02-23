/*
 * @Author: czy0729
 * @Date: 2021-08-09 01:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 22:24:34
 */
import React from 'react'
import isEqual from 'lodash.isequal'

function compareLog(prev, next) {
  const unsameKeys = []

  Object.keys(prev).forEach(key => {
    if (typeof prev[key] === 'object') {
      if (isEqual(prev[key], next[key])) return
    } else if (prev[key] === next[key]) return

    unsameKeys.push(key)
  })

  if (unsameKeys.length) {
    if (prev[unsameKeys[0]] === 'object') {
      compareLog(prev[unsameKeys[0]], next[unsameKeys[0]])
      return
    }

    // 不打印 styles, 没意义
    if (unsameKeys[0]) {
      if (unsameKeys[0] === 'styles') {
        console.info('\n', '[update]', unsameKeys[0], '\n')
      } else {
        console.info(
          '\n',
          '[update]',
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

function mapKey(target, key, value) {
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

/**
 * 封装通用React.memo的第二参数
 * @param {*} prevProps
 * @param {*} nextProps
 * @param {*} propsOrKeys
 */
function memoCompare(prevProps, nextProps, propsOrKeys, dev) {
  // 正常情况不会是false, 这是留给强制更新的一个参数配合
  if (prevProps === false && nextProps === false) return false

  const _prevProps = propsOrKeys ? {} : prevProps
  const _nextProps = propsOrKeys ? {} : nextProps
  if (propsOrKeys) {
    const _keys = Array.isArray(propsOrKeys) ? propsOrKeys : Object.keys(propsOrKeys)

    _keys.forEach(key => {
      mapKey(_prevProps, key, prevProps[key])
      mapKey(_nextProps, key, nextProps[key])
    })
  }

  const notUpdate = isEqual(_prevProps, _nextProps)
  if (dev && !notUpdate) compareLog(_prevProps, _nextProps)

  return notUpdate
}

/**
 * 封装通用 React.memo
 * @param {*} Component
 * @param {*} defaultProps
 * @param {*} customCompareFn | dev
 * @param {*} dev
 * @returns Component
 */
export default function memo<P, T extends React.FunctionComponent<P>>(
  Component: T,
  defaultProps?: P,
  customCompareFn?:
    | boolean
    | ((targetProps?: Record<string, unknown>) => boolean | object),
  dev?: boolean
): T {
  if (defaultProps) Component.defaultProps = defaultProps

  // 支持第三个参数为 dev: true
  let _dev = dev
  if (typeof customCompareFn === 'boolean') _dev = customCompareFn

  // @ts-expect-error
  return React.memo(Component, (prevProps, nextProps) =>
    typeof customCompareFn === 'function'
      ? memoCompare(customCompareFn(prevProps), customCompareFn(nextProps), null, _dev)
      : memoCompare(prevProps, nextProps, Component.defaultProps, _dev)
  )
}
