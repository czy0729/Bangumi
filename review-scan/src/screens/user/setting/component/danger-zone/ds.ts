/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:56:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:26:55
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'DangerZone')

export const TEXTS = {
  logout: {
    hd: '退出登录'
  }
} as const
