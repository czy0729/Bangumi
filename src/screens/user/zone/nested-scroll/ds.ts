/*
 * @Author: czy0729
 * @Date: 2024-01-06 21:48:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-06 21:48:34
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, TABS } from '../ds'

export const COMPONENT = rc(PARENT, 'NestedScroll')

export const PAGES = TABS.map(item => item.title)
