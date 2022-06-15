/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 14:41:00
 */
import { observer } from 'mobx-react'
import { contextTypes } from '@constants/constants'
import { IReactComponent } from '@types'

export default function obc<T extends IReactComponent>(
  Component: T,
  defaultProps?: object
): T {
  // @ts-ignore
  if (defaultProps) Component.defaultProps = defaultProps

  // @ts-ignore
  Component.contextTypes = contextTypes
  return observer(Component)
}
