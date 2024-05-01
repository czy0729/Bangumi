/*
 * @Author: czy0729
 * @Date: 2024-01-06 22:49:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-01 10:51:44
 */
import { rc } from '@utils/dev'
import { TABS } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'TabBarLabel')

export const TIMELINE_PAGE = TABS.findIndex(item => item.title === '时间线')
