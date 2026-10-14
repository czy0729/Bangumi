/*
 * @Author: czy0729
 * @Date: 2024-04-06 03:13:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 头部组件常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['game', 'Game'] as const
