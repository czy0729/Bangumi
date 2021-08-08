/* eslint-disable no-param-reassign */
/*
 * @Author: czy0729
 * @Date: 2021-08-08 02:05:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-09 01:36:33
 */
import { contextTypes } from '@constants'

export default function context(Component, defaultProps) {
  if (defaultProps) Component.defaultProps = defaultProps
  Component.contextTypes = contextTypes
  return Component
}
