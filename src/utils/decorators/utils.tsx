/*
 * @Author: czy0729
 * @Date: 2023-12-31 15:03:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08 22:00:54
 */
import { r } from '@utils/dev'
import { RERENDER_SHOW_DIFF } from '@src/config'

import type { ComponentType } from 'react'

/** HOC, 通过代理来判断函数组件是否被重新渲染 */
export function withDev<T extends ComponentType>(Component: T, devRerenderKey: string) {
  // 创建一个代理对象
  const ComponentProxy = new Proxy(Component as unknown as CallableFunction, {
    apply: function (target: CallableFunction, thisArg: unknown, argumentsList: unknown[]) {
      devLog(devRerenderKey, argumentsList)
      return Reflect.apply(target, thisArg, argumentsList) as unknown
    }
  })

  // 返回一个新的高阶组件
  return ComponentProxy as unknown as T
}

/** 打印重渲染信息 */
function devLog(devRerenderKey: string, argumentsList: unknown[]) {
  if (RERENDER_SHOW_DIFF) {
    const props = {
      ...((argumentsList[0] as Record<string, unknown>) ?? {})
    }
    Object.entries(props).forEach(([key, value]) => {
      if (['object', 'function'].includes(typeof value)) delete props[key]
    })
    r(devRerenderKey, props)
    return
  }

  r(devRerenderKey)
}
