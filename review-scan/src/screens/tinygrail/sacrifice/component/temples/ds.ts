/*
 * @Author: czy0729
 * @Date: 2024-03-06 02:02:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-06 02:07:44
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Temples')

export const EVENT = {
  id: '资产重组.圣殿图查看'
} as const
