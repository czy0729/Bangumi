/*
 * @Author: czy0729
 * @Date: 2024-08-20 17:00:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 注目榜组件常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Rank')

/** 榜单展示数量 (1 + 2 + 12) */
export const RANK_SIZE = 15
