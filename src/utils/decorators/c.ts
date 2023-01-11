/*
 * @Author: czy0729
 * @Date: 2021-08-08 02:05:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:05:57
 */
import { contextTypes } from '@constants/constants'
import { IReactComponent } from '@types'

export default function context<T extends IReactComponent>(
  Component: T,
  defaultProps?: object
): T {
  if (defaultProps) Component.defaultProps = defaultProps

  Component.contextTypes = contextTypes
  return Component
}
