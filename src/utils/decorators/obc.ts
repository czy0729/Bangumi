/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:06:08
 */
import { observer } from 'mobx-react'
import { contextTypes } from '@constants/constants'
import { IReactComponent } from '@types'

export default function obc<T extends IReactComponent>(
  Component: T,
  defaultProps?: object
): T {
  if (defaultProps) Component.defaultProps = defaultProps

  Component.contextTypes = contextTypes
  return observer(Component)
}
