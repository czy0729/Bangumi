/*
 * @Author: czy0729
 * @Date: 2024-02-29 23:54:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 时间线列表: 调试标识与动作展示顺序
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 月度动作统计的展示顺序 */
export const ACTIONS = ['看过', '在看', '想看', '搁置', '抛弃'] as const
