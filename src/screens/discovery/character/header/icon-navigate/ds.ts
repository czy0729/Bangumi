import { _ } from '@stores'
/*
 * @Author: czy0729
 * @Date: 2026-05-18 17:08:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-18 21:16:48
 */
import { rc } from '@utils/dev'
import { COVER_HEIGHT } from '../../component/item-recents/ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'IconNavigate')

/** 估计每个近况条目的高度 */
export const ITEM_HEIGHT = COVER_HEIGHT + _.md * 2
