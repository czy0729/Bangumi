/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:26:45
 */
import { contextTypes } from '@constants/constants'
import inject from './inject'

/** @deprecated inject with context types */
export default function ic(Store, Component, config?) {
  Component.contextTypes = contextTypes
  return inject(Store, config)(Component)
}
