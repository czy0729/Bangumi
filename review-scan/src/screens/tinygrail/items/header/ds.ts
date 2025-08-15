/*
 * @Author: czy0729
 * @Date: 2025-05-02 05:55:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 22:48:42
 */
import { rc } from '@utils/dev'
import { ITEMS_NOTIFY } from '@tinygrail/_/characters-modal'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const HM = ['tinygrail/items', 'TinygrailItems'] as const

export const DS = Object.keys(ITEMS_NOTIFY)
