/*
 * @Author: czy0729
 * @Date: 2024-06-02 15:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 21:34:34
 */
import { rc } from '@utils/dev'
import { MONO_VOICES_INNER_ORDERBY, MONO_VOICES_OUTER_ORDERBY } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ToolBar')

export const DATA_OUTER_ORDERBY = MONO_VOICES_OUTER_ORDERBY.map(item => item.label)

export const DATA_INNER_ORDERBY = MONO_VOICES_INNER_ORDERBY.map(item => item.label)
