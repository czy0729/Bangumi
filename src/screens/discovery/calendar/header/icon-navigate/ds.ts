/*
 * @Author: czy0729
 * @Date: 2026-03-21 15:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 16:35:47
 */
import { rc } from '@utils/dev'
import { COVER_HEIGHT } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'IconNavigate')

export const SECTION_HEIGHT = 36

export const ITEM_HEIGHT = COVER_HEIGHT + 24
