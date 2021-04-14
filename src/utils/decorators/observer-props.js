/* eslint-disable no-param-reassign */
/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-22 09:55:06
 */
import { observer } from 'mobx-react'

export default function ob(Component, defaultProps) {
  if (defaultProps) Component.defaultProps = defaultProps
  return observer(Component)
}
