/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:27:28
 */
import { observer } from 'mobx-react'
import { contextTypes } from '@constants/constants'
import { DEV } from '@src/config'
import { IReactComponent } from '@types'
import { withDev } from '../utils'

/**
 * @deprecated Observer with Context
 * @param Component 组件
 * @param param2 defaultProps | devRerenderKey 默认 props 或者调试组件名
 * @param param3 devRerenderKey 调试组件名
 * @returns
 */
export default function obc<T extends IReactComponent>(
  Component: T,
  param2?: object | string,
  param3?: string
): T {
  Component.contextTypes = contextTypes

  let devRerenderKey: string

  // 处理第二个参数
  if (param2) {
    if (typeof param2 === 'object') {
      Component.defaultProps = param2
    } else if (typeof param2 === 'string') {
      devRerenderKey = param2
    }
  }

  // 处理第三个参数
  if (param3) {
    if (typeof param3 === 'string') {
      devRerenderKey = param3
    }
  }

  return observer(DEV && devRerenderKey ? withDev(Component, devRerenderKey) : Component) as T
}
