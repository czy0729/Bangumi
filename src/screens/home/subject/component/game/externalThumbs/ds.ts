/*
 * @Author: czy0729
 * @Date: 2026-05-24 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-25 01:14:36
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ExternalThumbs')

export const THUMB_WIDTH = _.r(160)

export const THUMB_HEIGHT = Math.round(THUMB_WIDTH * 0.56)

export const SOURCE_VALUES = ['VNDB', 'DLsite'] as const
