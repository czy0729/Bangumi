/*
 * @Author: czy0729
 * @Date: 2023-12-31 15:03:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 11:50:16
 */
import { ComponentType } from 'react'
import { r } from '@utils/dev'
import { RERENDER_SHOW_DIFF } from '@src/config'

/** HOC, 通过代理来判断函数组件是否被重新渲染 */
export function withDev<T extends ComponentType>(Component: T, devRerenderKey: string) {
  // 创建一个代理对象
  const ComponentProxy = new Proxy(Component, {
    apply: function (target, thisArg, argumentsList) {
      devLog(devRerenderKey, argumentsList)
      return target.apply(thisArg, argumentsList)
    }
  })

  // 返回一个新的高阶组件
  return ComponentProxy
}

/** 打印重渲染信息 */
function devLog(devRerenderKey: string, argumentsList: object) {
  if (RERENDER_SHOW_DIFF) {
    const props = {
      ...argumentsList?.[0]
    }
    Object.entries(props).forEach(([key, value]) => {
      if (['object', 'function'].includes(typeof value)) delete props[key]
    })
    r(devRerenderKey, props)
    return
  }

  r(devRerenderKey)
}
