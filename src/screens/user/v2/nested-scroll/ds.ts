/*
 * @Author: czy0729
 * @Date: 2023-12-31 12:53:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 13:16:52
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, TABS } from '../ds'

export const COMPONENT = rc(PARENT, 'NestedScroll')

export const PAGES = TABS.map(item => item.title)
