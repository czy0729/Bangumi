/*
 * @Author: czy0729
 * @Date: 2024-06-02 15:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 17:20:26
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '分类排行.跳转'
} as const
