/*
 * @Author: czy0729
 * @Date: 2026-08-31 16:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 16:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 条目估算高度 (paddingVertical 12 + 主行高, onLayout 实测后纠正) */
export const ITEM_ESTIMATE_HEIGHT = 50
