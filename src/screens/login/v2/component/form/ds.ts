/*
 * @Author: czy0729
 * @Date: 2025-03-22 17:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 10:00:00
 *
 * 组件常量: 调试标识 / 可选登录域名
 */
import { rc } from '@utils/dev'
import { HOST, HOST_2, HOST_3 } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Form')

export const HOST_DS = [HOST, HOST_2, HOST_3] as const
