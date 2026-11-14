/*
 * @Author: czy0729
 * @Date: 2022-06-13 10:11:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 22:21:17
 *
 * 筛选面板常量
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Filter')

export const HIT_SLOP = {
  top: _.device(6, 4),
  right: _.device(2, 4),
  bottom: _.device(6, 4),
  left: _.device(2, 4)
}
