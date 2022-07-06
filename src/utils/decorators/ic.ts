/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 02:46:40
 */
import { contextTypes } from '@constants/constants'
import inject from './inject'

/** inject with context types */
export default function ic(Store, Component, config?) {
  Component.contextTypes = contextTypes
  return inject(Store, config)(Component)
}
