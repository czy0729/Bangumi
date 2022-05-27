/*
 * @Author: czy0729
 * @Date: 2021-08-08 02:05:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 08:01:23
 */
import { contextTypes } from '@constants/constants'

export default function context(Component, defaultProps) {
  if (defaultProps) Component.defaultProps = defaultProps
  Component.contextTypes = contextTypes
  return Component
}
