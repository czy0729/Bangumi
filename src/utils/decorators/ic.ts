/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-04 14:28:02
 */
import { contextTypes } from '@constants/constants'
import { IReactComponent } from '@types'
import inject from './inject'

/** inject with context types */
export default function ic<T extends IReactComponent>(Store: any, Component: T): T {
  Component.contextTypes = contextTypes
  // @ts-ignore
  return inject(Store)(Component)
}
