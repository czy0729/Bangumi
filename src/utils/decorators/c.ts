/*
 * @Author: czy0729
 * @Date: 2021-08-08 02:05:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 14:44:01
 */
import { contextTypes } from '@constants/constants'
import { IReactComponent } from '@types'

export default function context<T extends IReactComponent>(
  Component: T,
  defaultProps?: object
): T {
  // @ts-ignore
  if (defaultProps) Component.defaultProps = defaultProps

  // @ts-ignore
  Component.contextTypes = contextTypes
  return Component
}
