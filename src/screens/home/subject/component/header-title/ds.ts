/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:48:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 00:51:56
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'HeaderTitle')

export const COMPONENT_MAIN = rc(COMPONENT)

export const IMAGE_WIDTH = 28

export const IMAGE_HEIGHT = IMAGE_WIDTH * 1.28

export const DEFAULT_PROPS = {
  subjectId: 0 as $['subjectId'],
  common: '' as string,
  rank: '' as string | number,
  score: '' as $['rating']['score'],
  type: '' as $['type'],
  cn: '' as $['cn'],
  jp: '' as $['jp'],
  titleLabel: '' as $['titleLabel']
}
