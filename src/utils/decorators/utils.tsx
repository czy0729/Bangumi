/*
 * @Author: czy0729
 * @Date: 2023-12-31 15:03:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 15:54:08
 */
import { ComponentType } from 'react'
import { r } from '@utils/dev'

export function withDev(Component: ComponentType, devRerenderKey: string) {
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

function devLog(devRerenderKey: string, argumentsList: object) {
  r(devRerenderKey)
  return

  const props = {
    ...argumentsList?.[0]
  }
  Object.entries(props).forEach(([key, value]) => {
    if (['object', 'function'].includes(typeof value)) delete props[key]
  })
  r(devRerenderKey, props)
}
