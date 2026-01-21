/*
 * @Author: czy0729
 * @Date: 2024-01-20 09:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 09:33:55
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ContainerTouchable')

export const TITLE_HIT_SLOPS = {
  top: _.device(8, 4),
  right: _.device(8, 4),
  bottom: _.device(2, 4),
  left: _.device(8, 4)
}
