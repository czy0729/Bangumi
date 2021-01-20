/* eslint-disable no-param-reassign */
/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 15:42:29
 */
import { observer } from 'mobx-react'
import { contextTypes } from '@constants'

export default function obc(Component, defaultProps) {
  if (defaultProps) Component.defaultProps = defaultProps
  Component.contextTypes = contextTypes
  return observer(Component)
}
