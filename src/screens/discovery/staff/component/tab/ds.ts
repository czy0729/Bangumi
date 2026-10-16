/*
 * @Author: czy0729
 * @Date: 2026-10-16 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-16 00:00:00
 *
 * 切换条组件标识与分段文案
 */
import { rc } from '@utils/dev'
import { DATA_USERS } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Tab')

/** 分段文案, 顺序与 DATA_USERS 一致 */
export const VALUES = DATA_USERS.map(item => item.userName)
