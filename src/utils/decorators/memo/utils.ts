/*
 * @Author: czy0729
 * @Date: 2021-08-09 01:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:44:33
 */
import isEqual from 'lodash.isequal'
import { WEB } from '@constants'
import { AnyObject } from '@types'

/** 封装通用 React.memo 的第二参数, 注意返回 true 代表不更新, false 代表强制更新 */
export function memoCompare<P extends AnyObject>(
  prevProps: P | boolean,
  nextProps: P | boolean,
  propsOrKeys: P | keyof P,
  dev?: boolean,
  devRerenderKey?: string
) {
  /** 正常情况不会是 false, 这是留给强制更新的一个参数配合 */
  if (typeof prevProps === 'boolean' || typeof nextProps === 'boolean') {
    return !!(prevProps || nextProps)
  }

  const checkEqualPrevProps = (propsOrKeys ? {} : prevProps) as P
  const checkEqualNextProps = (propsOrKeys ? {} : nextProps) as P
  if (propsOrKeys) {
    const checkEqualKeys: (keyof P)[] = Array.isArray(propsOrKeys)
      ? propsOrKeys
      : Object.keys(propsOrKeys)
    checkEqualKeys.forEach(key => {
      mapKey(checkEqualPrevProps, key, prevProps[key])
      mapKey(checkEqualNextProps, key, nextProps[key])
    })
  }

  const notUpdate = isEqualEnv(checkEqualPrevProps, checkEqualNextProps)
  if (dev && !notUpdate) log(checkEqualPrevProps, checkEqualNextProps, devRerenderKey)

  return notUpdate
}

/** 对比先后 props, 并打印是为什么更新了 */
function log<P extends AnyObject>(prev: P, next: P, devRerenderKey?: string) {
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
        return
      }

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

/**
 * APP 内部分 key 并不需要参与是否更新的比较应, 会改变 target 对象
 *  - navigation
 *  - _loaded
 *  - typeof function
 *  - React.useRef
 *  - 第一层 object._loaded
 * */
function mapKey<P extends AnyObject>(target: P, key: keyof P, value: P[keyof P]): void {
  if (
    key === 'navigation' ||
    key === '_loaded' ||
    typeof value === 'function' ||
    (value && typeof value === 'object' && 'current' in value)
  ) {
    return
  }

  /**
   * 在 APP 中每次请求后, 不管数据源有没有变化, _loaded 都会变化;
   * 只额外过滤第一层对象里面的 _loaded, 避免影响是否更新判断
   */
  if (value && typeof value === 'object' && '_loaded' in value) {
    const { _loaded, ...other } = value
    target[key] = other as P[keyof P]
    return
  }

  target[key] = value
}

/** 对象值是否完全相同 */
function isEqualEnv<P extends AnyObject>(prevProps: P, nextProps: P): boolean {
  try {
    return WEB
      ? isEqual(prevProps, nextProps)
      : /** @todo RN 环境中暂不明其他库里面的 isEqual 误判 */
        JSON.stringify(prevProps) === JSON.stringify(nextProps)
  } catch (error) {
    /** 若出错暂时返回需要重渲染, 以防不显示渲染组件 */
    return false
  }
}
