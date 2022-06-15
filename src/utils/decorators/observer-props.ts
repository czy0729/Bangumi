/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 12:25:26
 */
import { observer } from 'mobx-react'
import { IReactComponent } from '@types'

export default function ob<T extends IReactComponent>(
  Component: T,
  defaultProps?: object
): T {
  if (defaultProps) Component.defaultProps = defaultProps
  return observer(Component)
}
