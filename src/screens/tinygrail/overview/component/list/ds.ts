/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:40:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 04:46:15
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '热门榜单.跳转'
} as const
