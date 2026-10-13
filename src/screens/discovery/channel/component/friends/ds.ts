/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:23:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 好友最近关注组件常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Friends')

/** 展示数量 (一行三个, 两行) */
export const FRIENDS_SIZE = 6
